import { ITEMS_LOADING,ADD_NEW_ITEM,REMOVE_ITEM,GET_ITEMS} from "./types";

const initialState = {
    items:[],
    comments:[],
    loading: false
}
//PAZI MIJENJAO SAM s na ITEMS

export default function   (state = initialState,action){
    switch(action.type){
        case GET_ITEMS:
            return{...state,
            items: action.payload,
            comments:action.payload.comments,
            loading:false
            }
        case ADD_NEW_ITEM:
            return{...state,
                items:[action.payload,...state.items],
                comments:[action.payload.comments]
                
            }
        case REMOVE_ITEM:
            return{...state,
                items:state.items.filter(ev=>ev._id !== action.payload)
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }

        default: return state;
    }
}