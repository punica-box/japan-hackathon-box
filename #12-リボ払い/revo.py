from boa.interop.Ontology.Runtime import GetCurrentBlockHash
from boa.interop.System.Runtime import GetTime, Notify
from boa.interop.System.Storage import Put, Get, GetContext


ADDRESSLISTKEY = "AddressListKey"
BALANCEMAPKEY = "BalanceMapKey"
MESSAGEMAPKEY = "MessageMapKey"
CHARASETMAPKEY = "CharaSetMapKey"
ADMINADDRES = "AURzJtcgKk91DEP5nPnQi9PA5AB8SByyG7"
DEVADDRESS = "AcF72jAVxPNdvsZrH7BXc1pps8XbGMenYq"

CHARALIST = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

def Main(operation, args):
    if operation == "init":
        return init()
    if operation == 'initAddress':
        addr = args[0]
        return initAddress(addr)
    if operation == 'checkBalance':
        addr = args[0]
        return checkBalance(addr)
    if operation == 'Gacha':
        addr = args[0]
        return Gacha(addr)
    if operation == 'sendMessage':
        to_address   = args[0]
        from_address = args[1]
        message      = args[2]
        return sendMessage(to_address, from_address, message)
    if operation == 'checkMessage':
        addr = args[0]
        return checkMessage(addr)
    
    return False

# initialize process
# TODO: owner check
def init():
    # init address list
    addrList = []
    addrListInfo = Serialize(addrList)
    Put(GetContext(), ADDRESSLISTKEY, addrListInfo)
    
    # init balance map
    balanceMap = {}
    balanceMapInfo = Serialize(balanceMap)
    Put(GetContext(), BALANCEMAPKEY, balanceMapInfo)
    
    # init message map
    messageMap = {}
    messageMapInfo = Serialize(messageMap)
    Put(GetContext(), MESSAGEMAPKEY, messageMapInfo)
    
    # init CharaSet
    defaultCharaSetMap = {
        'a':0,
        'b':0,
        'c':0,
        'd':0,
        'e':0,
        'f':0,
        'g':0,
        'h':0,
        'i':0,
        'j':0,
        'k':0,
        'l':0,
        'm':0,
        'n':0,
        'o':0,
        'p':0,
        'q':0,
        'r':0,
        's':0,
        't':0,
        'u':0,
        'v':0,
        'w':0,
        'x':0,
        'y':0,
        'z':0
    }
    defaultCharaSetMapInfo = Serialize(defaultCharaSetMap)
    Put(GetContext(), CHARASETMAPKEY, defaultCharaSetMapInfo)

    # prepare users for demo
    initAddress(ADMINADDRES)
    initAddress(DEVADDRESS)

    # add some characters to admin usr
    for c in CHARALIST:
        _addChara(ADMINADDRES, c, 9)

    Notify('successs')
    return True
    
# initialize new address data
def initAddress(address):
    if _isInitialized(address):
        Notify("already initialized..")
        return False
        
    Notify("new address. initialize!")
     
    _registerAddress(address)
    _initAddressBalance(address)
    _initMessageList(address)
    
    return True

# return balance of given address
def checkBalance(address):
    balance = _getBalanceByAddress(address)
    
    for chara in CHARALIST:
        if balance[chara] > 0:
            Notify([chara, balance[chara]])
    
    return True

# get word rondomly
# TODO: address owner check
# TODO: pay for getting word
def Gacha(address):
    # lot
    lotted = _lot()
    Notify(lotted)

    # add
    _addChara(address, lotted, 1)
    
    return True

# send message to to_address and change both of  balance
# TODO: address owner check
def sendMessage(to_address, from_address, message):

    # make array
    message_array = []
    Notify('sendMessage')
    i = 0
    while i < len(message):
        # Notify(str[i:i+1])
        message_array.append(message[i:i+1])
        i = i + 1
    Notify('make array')

    if not _canSendMessage(message, from_address):
        return False
    Notify('can send message')

    # initialized check for to_address
    if not _isInitialized(to_address):
        initAddress(to_address)

    # save message
    messageMap = _fetchMessageMap()
    messageMap[to_address].append(message)
    _saveMessageMap(messageMap)    

    balanceMap = _fetchBalanceMap()

    # list(message)
    for word in message_array:
        balanceMap[from_address][word] = balanceMap[from_address][word] - 1
        balanceMap[to_address][word]   = balanceMap[to_address][word] + 1

    _saveBalanceMap(balanceMap)

    Notify('success')
    return True

# check message of to_address
# TODO: address owner check
def checkMessage(to_address):
    messageMap = _fetchMessageMap()
    targetMessageList = messageMap[to_address]
    Notify(targetMessageList)

def _isInitialized(address):
    fetchedAddressList = _fetchAddressList()
    
    for element in fetchedAddressList:
        if element == address:
            return True
    return False

    
def _registerAddress(new_address):
    fetchedAddressList = _fetchAddressList()
    fetchedAddressList.append(new_address)
    _saveAddressList(fetchedAddressList)
    return True
    
    
def _initAddressBalance(address):
    fetchedBalanceMap = _fetchBalanceMap()
    charaSetMap = _fetchCharaSetMap()
    fetchedBalanceMap[address] = charaSetMap
    _saveBalanceMap(fetchedBalanceMap)
    
    return True

def _initMessageList(address):
    fetchedMessageMap = _fetchMessageMap()
    fetchedMessageMap[address] = []
    _saveMessageMap(fetchedMessageMap)
     

def _getBalanceByAddress(address):
    balanceMap = _fetchBalanceMap()
    return balanceMap[address]


def _lot():
    randomNumber = (abs(GetCurrentBlockHash()) + GetTime()) % len(CHARALIST)
    return CHARALIST[randomNumber]

def _addChara(address, chara, num):
    fetchedBalanceMap = _fetchBalanceMap()

    fetchedBalanceMap[address][chara] = fetchedBalanceMap[address][chara] + num
    
    _saveBalanceMap(fetchedBalanceMap)

    return True

# from_address validation
def _canSendMessage(message, from_address):

    # make array
    message_array = []
    Notify(message)
    i = 0
    while i < len(message):
        # Notify(str[i:i+1])
        message_array.append(message[i:i+1])
        i = i + 1

    # not initialized me
    if not _isInitialized(from_address):
        return False
    Notify('initialized')
    
    # count word
    word_to_count_map = _fetchCharaSetMap()

    for word in message_array:
        word_to_count_map[word] = word_to_count_map[word] + 1

    balanceMap = _fetchBalanceMap()

    # enough word balance check
    for chara in CHARALIST:
        need_count = word_to_count_map[chara]
        user_count = balanceMap[from_address][chara]
        if need_count > user_count:
            return False

    Notify('count ok')

    return True

# ----------------------------
# methods for Key Value Store
# ----------------------------
def _fetchAddressList():
    list1Info = Get(GetContext(), ADDRESSLISTKEY)
    return Deserialize(list1Info)

def _saveAddressList(list1):
    list1Info = Serialize(list1)
    Put(GetContext(), ADDRESSLISTKEY, list1Info)
    
def _fetchBalanceMap():
    balanceMapInfo = Get(GetContext(), BALANCEMAPKEY)
    return Deserialize(balanceMapInfo)

def _saveBalanceMap(balanceMap):
    balanceMapInfo = Serialize(balanceMap)
    Put(GetContext(), BALANCEMAPKEY, balanceMapInfo)

def _fetchMessageMap():
    messageMap = Get(GetContext(), MESSAGEMAPKEY)
    return Deserialize(messageMap)

def _saveMessageMap(messageMap):
    messageMapInfo = Serialize(messageMap)
    Put(GetContext(), MESSAGEMAPKEY, messageMapInfo)

def _fetchCharaSetMap():
    charaSetMap = Get(GetContext(), CHARASETMAPKEY)
    return Deserialize(charaSetMap)

