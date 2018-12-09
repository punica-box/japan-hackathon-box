from boa.interop.Ontology.Runtime import GetCurrentBlockHash
from boa.interop.System.Runtime import GetTime, Notify, Serialize, Deserialize
from boa.interop.System.Storage import Get, Put, Delete, GetContext
from boa.builtins import concat, ToScriptHash

PROB_MAP = 'prob_map'
OWNER = ToScriptHash('AcTamnvFVZmR3ykoAbz291w2t1T33GtnY6')
PROB_MAP_RAW = 'prob_map_raw'


def Main(operation, args):
    if operation == 'roll_gacha':
        return roll_gacha()
    elif operation == 'add_storage':
        if len(args) != 2:
            return False
        return add_storage(args[0], args[1])
    elif operation == 'add_card':
        if len(args) != 1:
            return False
        return
    elif operation == 'get_storage':
        if len(args) != 1:
            return False
        return get_storage(args[0])
    elif operation == 'init':
        return init()
    elif operation == 'get_prob':
        return get_prob()
    elif operation == 'has_key':
        return has_key()
    elif operation == 'update':
        return update()
    elif operation == 'sum_cum':
        return sum_cum()
    elif operation == 'update_prob':
        if len(args) != 2:
            return False
        return update_prob(args[0], args[1])
    elif operation == 'test_update_prob':
        return test_update_prob()
    elif operation == 'test_find_by_key':
        return test_find_by_key()
    elif operation == 'get_prob_raw':
        return get_prob_raw()
    return False


def update_prob(rarity, v):
    if (v < 0) or (v > 100):
        return v

    ctx = GetContext()
    prob_map_raw = Deserialize(Get(ctx, PROB_MAP_RAW))
    prob_map_raw = update_prob(prob_map_raw, rarity, v)
    prob_map_raw_s = Serialize(prob_map_raw)
    Put(ctx, PROB_MAP_RAW, prob_map_raw_s)

    prob_map = _sum_cum(prob_map_raw)
    s = Serialize(prob_map)
    Put(ctx, PROB_MAP, s)
    Notify(['update_prob', prob_map_raw])
    return True


def _update_prob(lst, k, v):
    lst = _add(lst, k, v)
    f = _find_by_key(lst, k)
    sum = 0
    for prob in lst:
        sum += prob[1]

    if f == -1:
        return -1

    rest = sum - 100
    i = 0
    n = len(lst)
    for prob in lst:
        if i == f:
            i = i + 1
            continue
        lst = _add(lst, lst[i][0], lst[i][1] - (rest/(n - 1)))
        i = i + 1
    return lst


def test_update_prob():
    p = [['a', 1], ['b', 99]]
    actual = _update_prob(p, 'a', 20)
    expected = [['a', 20], ['b', 80]]
    Notify(['prob', actual, expected])
    return True


def _sum_cum(records):
    ret = []
    sum = 0
    for record in records:
        sum += record[1]
        ret.append([record[0], sum])
    return ret


def sum_cum():
    a = _sum_cum([['a', 1], ['b', 2]])
    expected = [['a', 1], ['b', 3]]
    Notify(['prob', a, expected])
    return True


def get_prob():
    ctx = GetContext()
    prob_map = Deserialize(Get(ctx, PROB_MAP))
    Notify(['prob', prob_map])
    return True


def _find_by_key(li, key):
    i = 0
    for l in li:
        if key is l[0]:
            return i
        i = i + 1
    return -1


def test_find_by_key():
    l = [['a', 1], ['b', 2]]
    actual = _find_by_key(l, 'b')
    expected = 1
    Notify(['test_find_by_key', actual, expected])
    return True


def has_key():
    l1 = [['a', 10], ['b', 1]]
    l2 = [['b', 11]]
    Notify(['has_key', _has_key('b', l1), _has_key('a', l2)])
    return True


def update():
    l1 = [['a', 10], ['b', 1]]
    l2 = [['b', 11]]
    Notify(['update', _add(l1, 'a', 3), _add(l2, 'a', 9)])
    return True


def _add(li, k, v):
    if _has_key(k, li):
        i = 0
        for l in li:
            if k is l[0]:
                li[i][1] = v
            i += 1
        return li
    else:
        li.append([k, v])
    return li


def _has_key(key, li):
    for l in li:
        if key is l[0]:
            return True
    return False


def get_storage(key):
    ctx = GetContext()
    prob_map = Deserialize(Get(ctx, PROB_MAP))
    Notify(prob_map[key])
    return True


def get_prob_raw():
    ctx = GetContext()
    prob = Deserialize(Get(ctx, PROB_MAP_RAW))
    Notify(['prob', prob])
    return True


def init():
    ctx = GetContext()
    prob = [
        ['SSR', 1],
        ['SR', 5],
        ['R', 10],
        ['N', 84],
    ]
    prob_map = _sum_cum(prob)

    prob_s = Serialize(prob)
    Put(ctx, PROB_MAP_RAW, prob_s)
#    add_card('SSR', 1)
#    remove_card('SSR', 1)
#    change_prob('SSR', 80)
    s = Serialize(prob_map)
    Put(ctx, PROB_MAP, s)
    Notify(['prob', prob_map])
    return True


def add_storage(key, value):
    ctx = GetContext()
    prob_map = Deserialize(Get(ctx, PROB_MAP))

    prob_map[key] = value
    serialized_map = Serialize(prob_map)
    Put(ctx, PROB_MAP, serialized_map)
    Notify(prob_map[key])
    return True


def _rand():
    return abs(GetCurrentBlockHash()) + GetTime()


def roll_gacha():
    ctx = GetContext()
    rarity_probability = Deserialize(Get(ctx, PROB_MAP))

    ssr_character = [11, 10]
    sr_character = [5]
    r_character = [4, 6]
    n_character = [0, 1, 2, 3, 7, 8, 9]

    rarity_num = _rand() % 100
    if rarity_num == 0:
        rarity_num = 1

    rarity = 'SSR'
    if rarity_num > rarity_probability[len(rarity_probability) - 2][1]:
        rarity = 'N'
    elif rarity_num > rarity_probability[len(rarity_probability) - 3][1]:
        rarity = 'R'
    elif rarity_num > rarity_probability[len(rarity_probability) - 4][1]:
        rarity = 'SR'

    if rarity == 'SSR':
        character = ssr_character[0]
    elif rarity == 'SR':
        character = sr_character[_rand() % 2]
    elif rarity == 'R':
        character = r_character[_rand() % 3]
    else:
        character = n_character[_rand() % 4]

    Notify(character)
    return True
