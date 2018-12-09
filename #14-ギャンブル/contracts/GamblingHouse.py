from boa.interop.System.Runtime import Notify, Serialize, Deserialize
from boa.interop.System.ExecutionEngine import GetExecutingScriptHash
from boa.interop.System.Runtime import CheckWitness
from boa.interop.System.Storage import GetContext, Get, Put
from boa.builtins import ToScriptHash, sha256, concat, range
from boa.interop.Ontology.Runtime import Base58ToAddress
from boa.interop.Ontology.Native import Invoke

deployer = ToScriptHash('AYPgNWcEPPZna6TJMQWVCSx9deFwrx6ArT')
# b'jdfkdjfk''
DEALER_KEY = 'dealer:'
DEALER_ROOMS_KEY = "dealer_rooms_all:"
ROOMS_KEY = "rooms_map:"
ALL_ROOMS_KEY = "all_rooms"
DEALER_DEPOSITE_MAP = "dealer_deposite_key:"

DECIMAL_FACTOR = 1000000000

selfContractAddress = GetExecutingScriptHash()
OngContractAddress = ToScriptHash("AFmseVrdL9f9oyCzZefL9tG6UbvhfRZMHJ")

def Main(operation, args):
    if operation == 'RegisterAsDealer':
        addr = args[0]
        return RegisterAsDealer(addr)
    if operation == 'IsInvoker3':
        addr = args[0]
        return IsInvoker3(addr)
    if operation == 'returnFormatStr':
        return returnFormatStr()
    if operation == 'IsRegistered':
        addr = args[0]
        return IsRegistered(addr)
    if operation == "RegisterAsDealer":
        addr = args[0]
        return RegisterAsDealer(addr)
    if operation == "GetAllRooms":
        return GetAllRooms()
    if operation == "Initialize":
        return Initialize()
    if operation == "CreateRoom":
        addr = args[0]
        dealer_rate = args[1]
        minbet = args[2]
        gamble_rate = args[3]
        return CreateRoom(addr, dealer_rate, minbet, gamble_rate)
    if operation == "GetLatestRoomID":
        return GetLatestRoomID()
    if operation == "GetRoomByID":
        room_id = args[0]
        return GetRoomByID(room_id)
    # if operation == "depositOngToContract":
    #     addr = args[0]
    #     room_id = args[1]
    #     ong_amount = args[2]
    #     return depositOngToContract(addr, room_id, ong_amount)
        
def Initialize():
    ctx = GetContext()
    all_rooms_raw = Get(ctx, ALL_ROOMS_KEY)
    if len(all_rooms_raw) != 0:
        Notify("already initialized")
        return True
        
    Notify("initialized")
    Put(ctx, ALL_ROOMS_KEY,  Serialize([]))
    return True

def IsInvoker3(addr):
    if CheckWitness(Base58ToAddress(addr)):
        Notify("true")
        return True
    
    Notify("false")
    return True

## return JSON or not?
def returnFormatStr():
    # JSONが返せないので配列に詰めた情報をフロントエンドでパース可能な文字列として返す
    xs = ["a", "11", "b", "22", "c", "33"]
    # xsを下記の形で返す
    # a,11:b,22:c,33  -> フロントでsplit(":")してハンドリングする...
    return valuesToFormatStr(xs)

def valuesToFormatStr(values):
    if (len(values) % 2 != 0):
        return False
        
    ret = ""
    for i in range(0, len(values)):
        value = values[i]
        if (i % 2 == 0):
            if(i != 0):
                ret = concat(ret, ":")
            ret = concat(ret, value)
        else:
            ret = concat(ret, ",")
            ret = concat(ret, value)
        
    return ret
    
def RegisterAsDealer(addr):
    if not CheckWitness(Base58ToAddress(addr)):
        return False
    
    ctx = GetContext()
    dealer_map_key = concat(DEALER_KEY, addr)

    dealer_registeration_status = Get(ctx, dealer_map_key)
    # already registerred as dealer
    if len(dealer_registeration_status) > 0:
        return True
        
    dealer_map_key = concat(DEALER_KEY, addr)
    dealer_room_key = concat(DEALER_ROOMS_KEY, addr)
    
    # writing to storage.
    Put(ctx, dealer_map_key, "true")
    Put(ctx, dealer_room_key, Serialize([]))

def IsRegistered(addr):
    ctx = GetContext()
    dealer_map_key = concat(DEALER_KEY, addr)
    dealer_registeration_status = Get(ctx, dealer_map_key)
    
    return len(dealer_registeration_status) != 0
    
# 引数は全部string
def CreateRoom(addr, dealer_rate, minbet, gamble_rate, deposit_ong):
    # checking if the sent address is actually sender
    # # NOTE: we can't use Base58ToAddress in solochain 
    # if CheckWitness(Base58ToAddress(addr)) == False:
    #     Notify("not sender")
    #     return True
        
    if IsRegistered(addr) == False:
        Notify("not registered")
        return True

    depositOngToContract(addr, deposit_ong)
    ctx = GetContext()
    
    all_rooms_raw = Get(ctx, ALL_ROOMS_KEY)
    all_rooms = Deserialize(all_rooms_raw)
    new_room_id = len(all_rooms) + 1
    all_rooms.append(new_room_id)
    
    depositOngToContract(addr, new_room_id, deposit_ong)
    
    dealer_room_key = concat(DEALER_ROOMS_KEY, addr)
    dealer_rooms_raw = Get(ctx, dealer_room_key)
    dealer_rooms = Deserialize(dealer_rooms_raw)
    dealer_rooms.append(new_room_id)
    
    room_setting = {
        "dealer_rate": dealer_rate,
        "minbet": minbet,
        "gamble_rate": gamble_rate,
        "deposit_ong": deposit_ong,
    }
    
    Put(ctx, new_room_id, Serialize(room_setting))
    Put(ctx, dealer_room_key, Serialize(dealer_rooms))
    Put(ctx, ALL_ROOMS_KEY, Serialize(all_rooms))
    return True

def GetLatestRoomID():
    ctx = GetContext()
    all_rooms_raw = Get(ctx, ALL_ROOMS_KEY)
    all_rooms = Deserialize(all_rooms_raw)
    
    return all_rooms[len(all_rooms) - 1]
    
def GetRoomByID(room_id):
    ctx = GetContext()
    room_setting_raw = Get(ctx, room_id)
    room_setting = Deserialize(room_setting_raw)
    
    values = [
        "dealer_rate",
        room_setting["dealer_rate"],
        "minbet",
        room_setting["minbet"],
        "gamble_rate",
        room_setting["gamble_rate"],
        "deposit_ong",
        room_setting["deposit_ong"],
    ]
    
    return valuesToFormatStr(values) 
    
    
def GetAllRooms():
    ## FIXME
    ctx = GetContext()
    all_rooms_raw = Get(ctx, ALL_ROOMS_KEY)
    
    return all_rooms_raw
    all_rooms = Deserialize(all_rooms_raw)
    ret = ""
    for i in range(0, len(all_rooms)):
        if i != 0:
            ret = concat(ret, ",")
        ret = concat(ret, all_rooms[i])
    
    return ret
    
# NOTE fromAccount is Address (base58)
def depositOngToContract(fromAccount, room_id, ong_amount):
    # checking if the sent address is actually sender
    # NOTE: we can't use Base58ToAddress in solochain 
    # if CheckWitness(Base58ToAddress(fromAccount)) == False:
    #     Notify("not sender")
    #     return True
    if IsRegistered(fromAccount) == False:
        Notify(["depositOngToContract", "not registered"])
        return True
    
        
    param = state(Base58ToAddress(fromAccount), selfContractAddress, DECIMAL_FACTOR * ong_amount)
    res = Invoke(0, OngContractAddress, 'transfer', [param])
    
    if res and res == b'\x01':
        Notify(["depositOngToContract", selfContractAddress, ong_amount])
        dealer_deposite_key = concat(DEALER_DEPOSITE_MAP, fromAccount)
        dealer_deposite_key = concat(dealer_deposite_key, ":")
        dealer_deposite_key = concat(dealer_deposite_key, ong_amount)
        ctx = GetContext()
        Put(ctx, dealer_deposite_key, ong_amount)
        return True
    else:
        Notify('transfer Ong failed')
        return False