import {createStore} from 'vuex'

const BASE_URL = "http://192.168.4.69:8000/";
const PAGING_LIMIT = 20

const store = createStore({
    state() {
        return {
            items: [],
            itemListOffset: 0,
            query: "",
            activeItem: {}
        }
    },
    actions: {
        getItems(store) {
            console.log("asd")
            store.commit('setItems', [{id:"Товаров", name: "в базе", price: "не", count: "найдено"}]);
            fetch(`${BASE_URL}get-item/?search=${store.state.query}&ordering=id&limit=${PAGING_LIMIT}&offset=${store.state.itemListOffset}`)
                .then((res) => res.json())
                .then((resJSON) => {
                    if (resJSON['results'].length === 0) {
                        store.commit('setItems', [{id:"Товаров", name: "в базе", price: "не", count: "найдено"}]);
                    } else {
                        store.commit('setItems', resJSON['results'])
                    }
                });
        },


        // getSearch() {
        //     // store.commit('searchSet', [1, 0]);
        //     fetch(`${BASE_URL}get-item/?search=${this.query}&limit=20&offset=${
        //         store.state.offset * 20
        //     }`)
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (this.offset === 0) {
        //                 store.commit('searchSet', this.item = data['results'])
        //             } else {
        //                 this.item = this.item.concat(data['results'])
        //             }
        //             if (data.count === 0) this.empty = "Ничего не найдено";
        //             this.offset++;
        //             console.log(data);
        //             console.log(this.offset);
        //         });
        // },
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },
        // searchSet(state, query) {
        //     state.query = query
        // },
    },
});

export default store
