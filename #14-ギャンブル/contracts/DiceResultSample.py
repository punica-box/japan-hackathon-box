from boa.interop.Ontology.Runtime import GetCurrentBlockHash
from boa.interop.System.Blockchain import GetHeader
from boa.interop.System.Header import GetTimestamp
from boa.interop.System.Runtime import Notify

def Main(operation, args):
    if operation == 'DiceResult':
        return DiceResult()
    return False

def DiceResult():
    block_hash = GetCurrentBlockHash()
    block_header = GetHeader(block_hash)
    block_time = GetTimestamp(block_header)
    randam_data = abs(block_hash + block_time) % 46656
    
    player_dice_num = randam_data % 216
    player_dice1= int(player_dice_num / 36) + 1
    player_dice2= int(player_dice_num / 6) % 6 + 1
    player_dice3= player_dice_num % 6 +1
    
    if player_dice_num == 0:
        player_power = 38
        player_ratio = 5
    elif player_dice_num == 215:
        player_power = 37
        player_ratio = 3
    elif player_dice_num == 172:
        player_power = 36
        player_ratio = 3
    elif player_dice_num == 129:
        player_power = 35
        player_ratio = 3
    elif player_dice_num == 86:
        player_power = 34
        player_ratio = 3
    elif player_dice_num == 43:
        player_power = 33
        player_ratio = 3
    elif player_dice_num == 137:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 142:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 167:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 177:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 202:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 207:
        player_power = 32
        player_ratio = 2
    elif player_dice_num == 173:
        player_power = 31
        player_ratio = 1
    elif player_dice_num == 178:
        player_power = 31
        player_ratio = 1
    elif player_dice_num == 208:
        player_power = 31
        player_ratio = 1
    elif player_dice_num == 131:
        player_power = 30
        player_ratio = 1
    elif player_dice_num == 141:
        player_power = 30
        player_ratio = 1
    elif player_dice_num == 201:
        player_power = 30
        player_ratio = 1
    elif player_dice_num == 89:
        player_power = 29
        player_ratio = 1
    elif player_dice_num == 104:
        player_power = 29
        player_ratio = 1
    elif player_dice_num == 194:
        player_power = 29
        player_ratio = 1
    elif player_dice_num == 47:
        player_power = 28
        player_ratio = 1
    elif player_dice_num == 67:
        player_power = 28
        player_ratio = 1
    elif player_dice_num == 187:
        player_power = 28
        player_ratio = 1
    elif player_dice_num == 5:
        player_power = 27
        player_ratio = 1
    elif player_dice_num == 30:
        player_power = 27
        player_ratio = 1
    elif player_dice_num == 180:
        player_power = 27
        player_ratio = 1
    elif player_dice_num == 179:
        player_power = 26
        player_ratio = 1
    elif player_dice_num == 209:
        player_power = 26
        player_ratio = 1
    elif player_dice_num == 214:
        player_power = 26
        player_ratio = 1
    elif player_dice_num == 130:
        player_power = 25
        player_ratio = 1
    elif player_dice_num == 135:
        player_power = 25
        player_ratio = 1
    elif player_dice_num == 165:
        player_power = 25
        player_ratio = 1
    elif player_dice_num == 88:
        player_power = 24
        player_ratio = 1
    elif player_dice_num == 98:
        player_power = 24
        player_ratio = 1
    elif player_dice_num == 158:
        player_power = 24
        player_ratio = 1
    elif player_dice_num == 46:
        player_power = 23
        player_ratio = 1
    elif player_dice_num == 61:
        player_power = 23
        player_ratio = 1
    elif player_dice_num == 151:
        player_power = 23
        player_ratio = 1
    elif player_dice_num == 4:
        player_power = 22
        player_ratio = 1
    elif player_dice_num == 24:
        player_power = 22
        player_ratio = 1
    elif player_dice_num == 144:
        player_power = 22
        player_ratio = 1
    elif player_dice_num == 143:
        player_power = 21
        player_ratio = 1
    elif player_dice_num == 203:
        player_power = 21
        player_ratio = 1
    elif player_dice_num == 213:
        player_power = 21
        player_ratio = 1
    elif player_dice_num == 136:
        player_power = 20
        player_ratio = 1
    elif player_dice_num == 166:
        player_power = 20
        player_ratio = 1
    elif player_dice_num == 171:
        player_power = 20
        player_ratio = 1
    elif player_dice_num == 87:
        player_power = 19
        player_ratio = 1
    elif player_dice_num == 92:
        player_power = 19
        player_ratio = 1
    elif player_dice_num == 122:
        player_power = 19
        player_ratio = 1
    elif player_dice_num == 45:
        player_power = 18
        player_ratio = 1
    elif player_dice_num == 55:
        player_power = 18
        player_ratio = 1
    elif player_dice_num == 115:
        player_power = 18
        player_ratio = 1
    elif player_dice_num == 3:
        player_power = 17
        player_ratio = 1
    elif player_dice_num == 18:
        player_power = 17
        player_ratio = 1
    elif player_dice_num == 108:
        player_power = 17
        player_ratio = 1
    elif player_dice_num == 107:
        player_power = 16
        player_ratio = 1
    elif player_dice_num == 197:
        player_power = 16
        player_ratio = 1
    elif player_dice_num == 212:
        player_power = 16
        player_ratio = 1
    elif player_dice_num == 100:
        player_power = 15
        player_ratio = 1
    elif player_dice_num == 160:
        player_power = 15
        player_ratio = 1
    elif player_dice_num == 170:
        player_power = 15
        player_ratio = 1
    elif player_dice_num == 93:
        player_power = 14
        player_ratio = 1
    elif player_dice_num == 123:
        player_power = 14
        player_ratio = 1
    elif player_dice_num == 128:
        player_power = 14
        player_ratio = 1
    elif player_dice_num == 44:
        player_power = 13
        player_ratio = 1
    elif player_dice_num == 49:
        player_power = 13
        player_ratio = 1
    elif player_dice_num == 79:
        player_power = 13
        player_ratio = 1
    elif player_dice_num == 2:
        player_power = 12
        player_ratio = 1
    elif player_dice_num == 12:
        player_power = 12
        player_ratio = 1
    elif player_dice_num == 72:
        player_power = 12
        player_ratio = 1
    elif player_dice_num == 71:
        player_power = 11
        player_ratio = 1
    elif player_dice_num == 191:
        player_power = 11
        player_ratio = 1
    elif player_dice_num == 211:
        player_power = 11
        player_ratio = 1
    elif player_dice_num == 64:
        player_power = 10
        player_ratio = 1
    elif player_dice_num == 154:
        player_power = 10
        player_ratio = 1
    elif player_dice_num == 169:
        player_power = 10
        player_ratio = 1
    elif player_dice_num == 57:
        player_power = 9
        player_ratio = 1
    elif player_dice_num == 117:
        player_power = 9
        player_ratio = 1
    elif player_dice_num == 127:
        player_power = 9
        player_ratio = 1
    elif player_dice_num == 50:
        player_power = 8
        player_ratio = 1
    elif player_dice_num == 80:
        player_power = 8
        player_ratio = 1
    elif player_dice_num == 85:
        player_power = 8
        player_ratio = 1
    elif player_dice_num == 1:
        player_power = 7
        player_ratio = 1
    elif player_dice_num == 6:
        player_power = 7
        player_ratio = 1
    elif player_dice_num == 36:
        player_power = 7
        player_ratio = 1
    elif player_dice_num == 35:
        player_power = 6
        player_ratio = 1
    elif player_dice_num == 185:
        player_power = 6
        player_ratio = 1
    elif player_dice_num == 210:
        player_power = 6
        player_ratio = 1
    elif player_dice_num == 28:
        player_power = 5
        player_ratio = 1
    elif player_dice_num == 148:
        player_power = 5
        player_ratio = 1
    elif player_dice_num == 168:
        player_power = 5
        player_ratio = 1
    elif player_dice_num == 21:
        player_power = 4
        player_ratio = 1
    elif player_dice_num == 111:
        player_power = 4
        player_ratio = 1
    elif player_dice_num == 126:
        player_power = 4
        player_ratio = 1
    elif player_dice_num == 14:
        player_power = 3
        player_ratio = 1
    elif player_dice_num == 74:
        player_power = 3
        player_ratio = 1
    elif player_dice_num == 84:
        player_power = 3
        player_ratio = 1
    elif player_dice_num == 7:
        player_power = 2
        player_ratio = 1
    elif player_dice_num == 37:
        player_power = 2
        player_ratio = 1
    elif player_dice_num == 42:
        player_power = 2
        player_ratio = 1
    elif player_dice_num == 8:
        player_power = 0
        player_ratio = 0
    elif player_dice_num == 13:
        player_power = 0
        player_ratio = 0
    elif player_dice_num == 38:
        player_power = 0
        player_ratio = 0
    elif player_dice_num == 48:
        player_power = 0
        player_ratio = 0
    elif player_dice_num == 73:
        player_power = 0
        player_ratio = 0
    elif player_dice_num == 78:
        player_power = 0
        player_ratio = 0
    else:
        player_power = 1
        player_ratio = 2
    
    
    dealer_dice_num = int(randam_data / 216)
    dealer_dice1= int(dealer_dice_num / 36) + 1
    dealer_dice2= int(dealer_dice_num / 6) % 6 + 1
    dealer_dice3= dealer_dice_num % 6 +1
    
    if dealer_dice_num == 0:
        dealer_power = 38
        dealer_ratio = 5
    elif dealer_dice_num == 215:
        dealer_power = 37
        dealer_ratio = 3
    elif dealer_dice_num == 172:
        dealer_power = 36
        dealer_ratio = 3
    elif dealer_dice_num == 129:
        dealer_power = 35
        dealer_ratio = 3
    elif dealer_dice_num == 86:
        dealer_power = 34
        dealer_ratio = 3
    elif dealer_dice_num == 43:
        dealer_power = 33
        dealer_ratio = 3
    elif dealer_dice_num == 137:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 142:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 167:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 177:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 202:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 207:
        dealer_power = 32
        dealer_ratio = 2
    elif dealer_dice_num == 173:
        dealer_power = 31
        dealer_ratio = 1
    elif dealer_dice_num == 178:
        dealer_power = 31
        dealer_ratio = 1
    elif dealer_dice_num == 208:
        dealer_power = 31
        dealer_ratio = 1
    elif dealer_dice_num == 131:
        dealer_power = 30
        dealer_ratio = 1
    elif dealer_dice_num == 141:
        dealer_power = 30
        dealer_ratio = 1
    elif dealer_dice_num == 201:
        dealer_power = 30
        dealer_ratio = 1
    elif dealer_dice_num == 89:
        dealer_power = 29
        dealer_ratio = 1
    elif dealer_dice_num == 104:
        dealer_power = 29
        dealer_ratio = 1
    elif dealer_dice_num == 194:
        dealer_power = 29
        dealer_ratio = 1
    elif dealer_dice_num == 47:
        dealer_power = 28
        dealer_ratio = 1
    elif dealer_dice_num == 67:
        dealer_power = 28
        dealer_ratio = 1
    elif dealer_dice_num == 187:
        dealer_power = 28
        dealer_ratio = 1
    elif dealer_dice_num == 5:
        dealer_power = 27
        dealer_ratio = 1
    elif dealer_dice_num == 30:
        dealer_power = 27
        dealer_ratio = 1
    elif dealer_dice_num == 180:
        dealer_power = 27
        dealer_ratio = 1
    elif dealer_dice_num == 179:
        dealer_power = 26
        dealer_ratio = 1
    elif dealer_dice_num == 209:
        dealer_power = 26
        dealer_ratio = 1
    elif dealer_dice_num == 214:
        dealer_power = 26
        dealer_ratio = 1
    elif dealer_dice_num == 130:
        dealer_power = 25
        dealer_ratio = 1
    elif dealer_dice_num == 135:
        dealer_power = 25
        dealer_ratio = 1
    elif dealer_dice_num == 165:
        dealer_power = 25
        dealer_ratio = 1
    elif dealer_dice_num == 88:
        dealer_power = 24
        dealer_ratio = 1
    elif dealer_dice_num == 98:
        dealer_power = 24
        dealer_ratio = 1
    elif dealer_dice_num == 158:
        dealer_power = 24
        dealer_ratio = 1
    elif dealer_dice_num == 46:
        dealer_power = 23
        dealer_ratio = 1
    elif dealer_dice_num == 61:
        dealer_power = 23
        dealer_ratio = 1
    elif dealer_dice_num == 151:
        dealer_power = 23
        dealer_ratio = 1
    elif dealer_dice_num == 4:
        dealer_power = 22
        dealer_ratio = 1
    elif dealer_dice_num == 24:
        dealer_power = 22
        dealer_ratio = 1
    elif dealer_dice_num == 144:
        dealer_power = 22
        dealer_ratio = 1
    elif dealer_dice_num == 143:
        dealer_power = 21
        dealer_ratio = 1
    elif dealer_dice_num == 203:
        dealer_power = 21
        dealer_ratio = 1
    elif dealer_dice_num == 213:
        dealer_power = 21
        dealer_ratio = 1
    elif dealer_dice_num == 136:
        dealer_power = 20
        dealer_ratio = 1
    elif dealer_dice_num == 166:
        dealer_power = 20
        dealer_ratio = 1
    elif dealer_dice_num == 171:
        dealer_power = 20
        dealer_ratio = 1
    elif dealer_dice_num == 87:
        dealer_power = 19
        dealer_ratio = 1
    elif dealer_dice_num == 92:
        dealer_power = 19
        dealer_ratio = 1
    elif dealer_dice_num == 122:
        dealer_power = 19
        dealer_ratio = 1
    elif dealer_dice_num == 45:
        dealer_power = 18
        dealer_ratio = 1
    elif dealer_dice_num == 55:
        dealer_power = 18
        dealer_ratio = 1
    elif dealer_dice_num == 115:
        dealer_power = 18
        dealer_ratio = 1
    elif dealer_dice_num == 3:
        dealer_power = 17
        dealer_ratio = 1
    elif dealer_dice_num == 18:
        dealer_power = 17
        dealer_ratio = 1
    elif dealer_dice_num == 108:
        dealer_power = 17
        dealer_ratio = 1
    elif dealer_dice_num == 107:
        dealer_power = 16
        dealer_ratio = 1
    elif dealer_dice_num == 197:
        dealer_power = 16
        dealer_ratio = 1
    elif dealer_dice_num == 212:
        dealer_power = 16
        dealer_ratio = 1
    elif dealer_dice_num == 100:
        dealer_power = 15
        dealer_ratio = 1
    elif dealer_dice_num == 160:
        dealer_power = 15
        dealer_ratio = 1
    elif dealer_dice_num == 170:
        dealer_power = 15
        dealer_ratio = 1
    elif dealer_dice_num == 93:
        dealer_power = 14
        dealer_ratio = 1
    elif dealer_dice_num == 123:
        dealer_power = 14
        dealer_ratio = 1
    elif dealer_dice_num == 128:
        dealer_power = 14
        dealer_ratio = 1
    elif dealer_dice_num == 44:
        dealer_power = 13
        dealer_ratio = 1
    elif dealer_dice_num == 49:
        dealer_power = 13
        dealer_ratio = 1
    elif dealer_dice_num == 79:
        dealer_power = 13
        dealer_ratio = 1
    elif dealer_dice_num == 2:
        dealer_power = 12
        dealer_ratio = 1
    elif dealer_dice_num == 12:
        dealer_power = 12
        dealer_ratio = 1
    elif dealer_dice_num == 72:
        dealer_power = 12
        dealer_ratio = 1
    elif dealer_dice_num == 71:
        dealer_power = 11
        dealer_ratio = 1
    elif dealer_dice_num == 191:
        dealer_power = 11
        dealer_ratio = 1
    elif dealer_dice_num == 211:
        dealer_power = 11
        dealer_ratio = 1
    elif dealer_dice_num == 64:
        dealer_power = 10
        dealer_ratio = 1
    elif dealer_dice_num == 154:
        dealer_power = 10
        dealer_ratio = 1
    elif dealer_dice_num == 169:
        dealer_power = 10
        dealer_ratio = 1
    elif dealer_dice_num == 57:
        dealer_power = 9
        dealer_ratio = 1
    elif dealer_dice_num == 117:
        dealer_power = 9
        dealer_ratio = 1
    elif dealer_dice_num == 127:
        dealer_power = 9
        dealer_ratio = 1
    elif dealer_dice_num == 50:
        dealer_power = 8
        dealer_ratio = 1
    elif dealer_dice_num == 80:
        dealer_power = 8
        dealer_ratio = 1
    elif dealer_dice_num == 85:
        dealer_power = 8
        dealer_ratio = 1
    elif dealer_dice_num == 1:
        dealer_power = 7
        dealer_ratio = 1
    elif dealer_dice_num == 6:
        dealer_power = 7
        dealer_ratio = 1
    elif dealer_dice_num == 36:
        dealer_power = 7
        dealer_ratio = 1
    elif dealer_dice_num == 35:
        dealer_power = 6
        dealer_ratio = 1
    elif dealer_dice_num == 185:
        dealer_power = 6
        dealer_ratio = 1
    elif dealer_dice_num == 210:
        dealer_power = 6
        dealer_ratio = 1
    elif dealer_dice_num == 28:
        dealer_power = 5
        dealer_ratio = 1
    elif dealer_dice_num == 148:
        dealer_power = 5
        dealer_ratio = 1
    elif dealer_dice_num == 168:
        dealer_power = 5
        dealer_ratio = 1
    elif dealer_dice_num == 21:
        dealer_power = 4
        dealer_ratio = 1
    elif dealer_dice_num == 111:
        dealer_power = 4
        dealer_ratio = 1
    elif dealer_dice_num == 126:
        dealer_power = 4
        dealer_ratio = 1
    elif dealer_dice_num == 14:
        dealer_power = 3
        dealer_ratio = 1
    elif dealer_dice_num == 74:
        dealer_power = 3
        dealer_ratio = 1
    elif dealer_dice_num == 84:
        dealer_power = 3
        dealer_ratio = 1
    elif dealer_dice_num == 7:
        dealer_power = 2
        dealer_ratio = 1
    elif dealer_dice_num == 37:
        dealer_power = 2
        dealer_ratio = 1
    elif dealer_dice_num == 42:
        dealer_power = 2
        dealer_ratio = 1
    elif dealer_dice_num == 8:
        dealer_power = 0
        dealer_ratio = 0
    elif dealer_dice_num == 13:
        dealer_power = 0
        dealer_ratio = 0
    elif dealer_dice_num == 38:
        dealer_power = 0
        dealer_ratio = 0
    elif dealer_dice_num == 48:
        dealer_power = 0
        dealer_ratio = 0
    elif dealer_dice_num == 73:
        dealer_power = 0
        dealer_ratio = 0
    elif dealer_dice_num == 78:
        dealer_power = 0
        dealer_ratio = 0
    else:
        dealer_power = 1
        dealer_ratio = 2
    
    if player_power > dealer_power:
        deal_result = "player_win"
        deal_ratio = player_ratio
    elif player_power < dealer_power:
        deal_result = "dealer_win"
        deal_ratio = dealer_ratio
    elif player_power == dealer_power:
        deal_result = "draw"
        deal_ratio = 0
    else:
        deal_result = "error"
        deal_ratio = 0
    
    result_map = {
        "dealer_dice1": str(dealer_dice1),
        "dealer_dice2": str(dealer_dice2),
        "dealer_dice3": str(dealer_dice3),
        "player_dice1": str(player_dice1),
        "player_dice2": str(player_dice2),
        "player_dice3": str(player_dice3),
        "deal_result": deal_result,
        "deal_ratio": deal_ratio,
    }
    return True