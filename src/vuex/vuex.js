import {createStore} from 'vuex'

const BASE_URL = "http://192.168.4.69:8000/";
const PAGING_LIMIT = 20;

const store = createStore({
    state() {
        return {
            items: [],
            itemListOffset: 0,
            query: "",
        }
    },
    actions: {
        getItems(store) {
            store.commit('setItems', [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]);
            fetch(`${BASE_URL}get-item/?search=${store.state.query}&ordering=id&limit=${PAGING_LIMIT}&offset=${store.state.itemListOffset}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data['results'].length === 0) {
                        store.commit('setItems', [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]);
                    } else {
                        store.commit('setItems', data['results'])
                    }
                });
        },


    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },

    },
});

export default store
