import firebase from 'firebase/app'
import { database } from 'firebase'
import { firebaseConfig } from '../../config'
import { Transaction } from '../types'

firebase.initializeApp(firebaseConfig)
const db = database()

export const transactions = db.ref('transactions')

export function addTransaction(transaction: Transaction) {
  transactions.push(transaction)
}
