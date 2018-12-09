export function createOep4Crowdsale({
  tokenName,
  symbol,
  decimals,
  totalSupply,
  owner,
  initialAmount,
  tokensPerOnt,
}) {
return `"""
Custom OEP-4 Token w/ crowdsale ${tokenName}
"""
from boa.interop.System.Storage import GetContext, Get, Put, Delete
from boa.interop.System.Runtime import Notify, CheckWitness
from boa.interop.System.Action import RegisterAction
from boa.builtins import concat, ToScriptHash
from boa.interop.Ontology.Native import Invoke
from boa.builtins import state

TransferEvent = RegisterAction("transfer", "from", "to", "amount")
ApprovalEvent = RegisterAction("approval", "owner", "spender", "amount")
OnKYCRegister = RegisterAction("kyc_registration", "address")

ctx = GetContext()

NAME = '${tokenName}'
SYMBOL = '${symbol}'
DECIMALS = ${decimals}
FACTOR = ${Math.pow(10, decimals)}
OWNER = ToScriptHash("${owner}")
TOTAL_AMOUNT = ${totalSupply}
TOKEN_INITIAL_AMOUNT = ${initialAmount}
TOKENS_PER_ONT = ${tokensPerOnt}
BALANCE_PREFIX = bytearray(b'')
APPROVE_PREFIX = b''
SUPPLY_KEY = 'TotalSupply'
KYC_KEY = 'kyc_ok'
TOKEN_CIRC_KEY = 'in_circulation'
INIT_KEY = 'initialized'
OntContract = ToScriptHash("AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV")
CROWDSALE_STARTED_KEY = 'sale_started'
CROWDSALE_ENDED_KEY = 'sale_ended'

def Main(operation, args):

    if operation == 'init':
        return init()
    if operation == 'name':
        return name()
    if operation == 'symbol':
        return symbol()
    if operation == 'decimals':
        return decimals()
    if operation == 'totalSupply':
        return totalSupply()
    if operation == 'balanceOf':
        if len(args) != 1:
            return False
        acct = args[0]
        return balanceOf(acct)
    if operation == 'transfer':
        if len(args) != 3:
            return False
        else:
            from_acct = args[0]
            to_acct = args[1]
            amount = args[2]
            return transfer(from_acct,to_acct,amount)
    if operation == 'transferMulti':
        return transferMulti(args)
    if operation == 'transferFrom':
        if len(args) != 4:
            return False
        spender = args[0]
        from_acct = args[1]
        to_acct = args[2]
        amount = args[3]
        return transferFrom(spender,from_acct,to_acct,amount)
    if operation == 'approve':
        if len(args) != 3:
            return False
        owner  = args[0]
        spender = args[1]
        amount = args[2]
        return approve(owner,spender,amount)
    if operation == 'allowance':
        if len(args) != 2:
            return False
        owner = args[0]
        spender = args[1]
        return allowance(owner,spender)
    if operation == 'circulation':
        return circulation()
    if operation == 'startCrowdSale':
        return startCrowdSale()
    if operation == 'endCrowdsale':
        return endCrowdSale()
    if operation == 'crowdsaleStatus':
        return crowdsaleStatus()
    if operation == 'mintTokens':
        purchaser = args[0]
        ontAmount = args[1]
        return mintTokens(purchaser, ontAmount)
    if operation == 'crowdsaleRegister':
        return crowdsaleRegister(args)
    if operation == 'crowdsaleRegistrationStatus':
        acct = args[0]
        return crowdsaleRegistrationStatus(acct)
    if operation == 'crowdsaleAvailable':
        return crowdsaleAvailable()

    return False

def init():

    if not CheckWitness(OWNER):
        print("Must be owner to init")
        return False

    if Get(ctx,INIT_KEY):
        Notify("Already initialized!")
        return False

    Put(ctx, INIT_KEY, 1)

    total = TOKEN_INITIAL_AMOUNT * FACTOR

    key = concat(BALANCE_PREFIX,OWNER)

    Put(ctx, key, total)

    TransferEvent("", OWNER, total)
    add_to_circulation(total)

    return True

def name():
    """
    :return: name of the token
    """
    return NAME


def symbol():
    """
    :return: symbol of the token
    """
    return SYMBOL


def decimals():
    """
    :return: the decimals of the token
    """
    return DECIMALS


def totalSupply():
    """
    :return: the total supply of the token
    """
    return TOTAL_AMOUNT * FACTOR

def circulation():
    return Get(ctx, TOKEN_CIRC_KEY)


def balanceOf(account):
    """
    :param account:
    :return: the token balance of account
    """
    if len(account) != 20:
        raise Exception("address length error")
    return Get(ctx,concat(BALANCE_PREFIX,account))


def transfer(from_acct,to_acct,amount):

    if len(to_acct) != 20 or len(from_acct) != 20:
        raise Exception("address length error")
    if CheckWitness(from_acct) == False or amount < 0:
        return False

    fromKey = concat(BALANCE_PREFIX,from_acct)
    fromBalance = Get(ctx,fromKey)
    if amount > fromBalance:
        return False
    if amount == fromBalance:
        Delete(ctx,fromKey)
    else:
        Put(ctx,fromKey,fromBalance - amount)

    toKey = concat(BALANCE_PREFIX,to_acct)
    toBalance = Get(ctx,toKey)
    Put(ctx,toKey,toBalance + amount)

    TransferEvent(from_acct, to_acct, amount)

    return True


def transferMulti(args):

    for p in args:
        if len(p) != 3:
            # return False is wrong
            raise Exception("transferMulti params error.")
        if transfer(p[0], p[1], p[2]) == False:
            # return False is wrong since the previous transaction will be successful
            raise Exception("transferMulti failed.")
    return True


def approve(owner,spender,amount):

    if len(spender) != 20 or len(owner) != 20:
        raise Exception("address length error")
    if CheckWitness(owner) == False:
        return False
    if amount > balanceOf(owner) or amount < 0:
        return False

    key = concat(concat(APPROVE_PREFIX,owner),spender)
    Put(ctx, key, amount)

    ApprovalEvent(owner, spender, amount)

    return True


def transferFrom(spender,from_acct,to_acct,amount):

    if len(spender) != 20 or len(from_acct) != 20 or len(to_acct) != 20:
        raise Exception("address length error")
    if CheckWitness(spender) == False:
        return False

    fromKey = concat(BALANCE_PREFIX, from_acct)
    fromBalance = Get(ctx, fromKey)
    if amount > fromBalance or amount < 0:
        return False

    approveKey = concat(concat(APPROVE_PREFIX,from_acct),spender)
    approvedAmount = Get(ctx,approveKey)
    toKey = concat(BALANCE_PREFIX,to_acct)

    if amount > approvedAmount:
        return False
    elif amount == approvedAmount:
        Delete(ctx,approveKey)
        Put(ctx, fromKey, fromBalance - amount)
    else:
        Put(ctx,approveKey,approvedAmount - amount)
        Put(ctx, fromKey, fromBalance - amount)

    toBalance = Get(ctx, toKey)
    Put(ctx, toKey, toBalance + amount)

    TransferEvent(from_acct, to_acct, amount)

    return True


def allowance(owner,spender):

    key = concat(concat(APPROVE_PREFIX,owner),spender)
    return Get(ctx,key)

def add_to_circulation(amount):

    current_supply = Get(ctx, TOKEN_CIRC_KEY)

    Put(ctx, TOKEN_CIRC_KEY, current_supply + amount)
    return True

def startCrowdSale():

    if not CheckWitness(OWNER):
        print("Must be owner to start crowdsale")
        return False

    if Get(ctx,CROWDSALE_STARTED_KEY):
        Notify("Already started!")
        return False

    Put(ctx, CROWDSALE_STARTED_KEY, 1)

    return True

def endCrowdSale():

    if not CheckWitness(OWNER):
        print("Must be owner to end crowdsale")
        return False

    if Get(ctx,CROWDSALE_STARTED_KEY):
        Notify("Already ended!")
        return False

    Put(ctx, CROWDSALE_ENDED_KEY, 1)

    return True

def crowdsaleStatus():

    if Get(ctx,CROWDSALE_ENDED_KEY):
        return 2

    if Get(ctx,CROWDSALE_STARTED_KEY):
        return 1

    return 0

def crowdsaleRegister(args):

    ok_count = 0

    if CheckWitness(OWNER):

        for address in args:

            if len(address) == 20:

                kyc_storage_key = concat(KYC_KEY, address)
                Put(ctx, kyc_storage_key, 1)

                OnKYCRegister(address)
                ok_count += 1

    return ok_count

def crowdsaleRegistrationStatus(acct):

    kyc_storage_key = concat(KYC_KEY, acct)

    return Get(ctx, kyc_storage_key)

def crowdsaleAvailable():

    in_circ = Get(ctx, TOKEN_CIRC_KEY)

    total_supply = TOTAL_AMOUNT * FACTOR

    available = total_supply - in_circ

    return available

def mintTokens(purchaser,ontAmount):

    if not (Get(ctx,INIT_KEY)):
        Notify("Contract not yet initialized!")
        return False

    if not Get(ctx,CROWDSALE_STARTED_KEY):
        Notify("Crowd sale not yet started!")
        return False

    if Get(ctx,CROWDSALE_ENDED_KEY):
        Notify("Crowd sale ended!")
        return False

    if not crowdsaleRegistrationStatus(purchaser):
        Notify("Address not registered for crowdsale!")
        return False

    currentSupply = circulation()
    purchaseAmount = TOKENS_PER_ONT * ontAmount * FACTOR
    newSupply = purchaseAmount + currentSupply

    if (newSupply > totalSupply()):
        raise Exception("Max supply reached!")

    purchaserKey = concat(BALANCE_PREFIX,purchaser)
    purchaserBalance = Get(ctx,purchaserKey)

    param = state(purchaser, OWNER, ontAmount)
    res = Invoke(0, OntContract, "transfer", [param])

    if res != b'\x01':
        raise Exception("transfer ont error.")

    Put(ctx, purchaserKey, purchaserBalance + purchaseAmount)
    add_to_circulation(purchaseAmount)

    TransferEvent("", purchaser, purchaseAmount)

    return True
`;
}
