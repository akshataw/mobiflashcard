export const FETCH_DECK_DB = 'fetch_deck_db';
export const FETCH_DECK_INFO = 'fetch_deck_info';
export const DELETE_DECK = 'delete_deck';

import { AsyncStorage } from 'react-native';
import { getDecks, getDeck } from '../utils/api';

export function fetchDeckDB(){
    return(dispatch) => {
      getDecks().then(data => dispatch({
        type: FETCH_DECK_DB,
        payload: data
      }));
    } 
  }

export function deleteDeck(deleteTitle){
    return(dispatch) => {
      AsyncStorage.removeItem(deleteTitle).then(getDecks().then(data => {
        dispatch({
          type: DELETE_DECK,
          payload: data
        })
      }).catch(err => console.log(err))).catch(err => console.log(err));
    }
  }

export function getDeckInfo(entryId){
    return(dispatch) => {
      getDeck(entryId).then(cardDeck => {
        dispatch({
          type: FETCH_DECK_INFO,
          payload: JSON.parse(cardDeck)
        })
      });
    }
  }
