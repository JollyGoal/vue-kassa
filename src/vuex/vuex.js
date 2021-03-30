import {createStore} from 'vuex'

const BASE_URL = "http://192.168.4.69:8000/";
const PAGING_LIMIT = 20;
const store = createStore({
    state() {
        return {
            items: [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}],
            itemListOffset: 0,
            trans_limit: 20,
            trans_offset: 0,
            itemsCount: 2,
            query: "",
            outcome: [],
            outcomeListOffset: 0,
            activeItem: {},
            trans: [],
            type: "",
            basket: [],
            token:"",
            user: null
        }
    },
    actions: {
        getMe(store) {
          fetch(`${BASE_URL}auth/users/me/`, {
              headers: {
                  "Authorization": `Token ${store.state.token}`
              },
          })
              .then((res) => res.json())
              .then((json) => {
                  console.log(json)
                  store.state.user = json
              })
        },
        getItems(store) {
            if (store.state.items.length < store.state.itemsCount) {
                fetch(`${BASE_URL}get-item/?search=${store.state.query}&ordering=-id&limit=${PAGING_LIMIT}&offset=${store.state.itemListOffset * PAGING_LIMIT}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data['count'] !== 0) {
                            if (store.state.items.length !== 1 && data.count !== 1 && store.state.items.length !== 0) {
                                for (const i in data['results']) {
                                    store.state.items.push(data['results'][i])
                                }
                                console.log('ree')
                            } else {
                                console.log(data)
                                store.commit('setItems', data['results'])
                            }

                            store.state.itemsCount = data.count;
                            store.state.itemListOffset++
                        } else {
                            store.state.items = [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]
                        }
                    });
            }
        },
        getOutcome(store) {
            fetch(`${BASE_URL}get-trans/?ordering=-id&limit=${PAGING_LIMIT}&offset=${store.state.outcomeListOffset}&type=OUTCOME`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    store.state.outcome = data['results']
                });
        },
        postItem(store, form) {
            this.formData = new FormData();
            for (const name in form) {
                this.formData.append(name, form[name]);
            }
            fetch(`${BASE_URL}item/`, {
                method: 'POST',
                body: this.formData,
            })
                .then((response) => {
                    // return response.json();
                    if (response.status === 201) return response.json();
                    else console.log("Че та не тоак")
                })
                .then((resJSON) => {
                    store.state.items.unshift(resJSON)
                    store.state.itemsCount++
                    if (store.state.items[store.state.items.length - 1].id === "Товаров") {
                        store.state.items.pop(-1)
                    }
                })
        },
        postOutcome(store, form) {
            form.sum = parseInt(form.sum);
            fetch(`${BASE_URL}trans/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Token ${store.state.token}`
                },
                body: JSON.stringify(form),
            })
                .then((response) => {
                    return response.json();
                })
                .then((resJSON) => {
                    store.state.outcome.unshift(resJSON)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getUpdateItem(store, id) {
            fetch(`${BASE_URL}get-item/${id}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    store.state.activeItem = data.item;
                });
        },
        postUpdateItem(store, options) {
            this.formData = new FormData();
            for (const name in options.form) {
                this.formData.append(name, options.form[name]);
            }
            fetch(`${BASE_URL}update/${options.id}`, {
                method: 'PUT',
                body: this.formData,
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                });
        },
        getTransactions(store, date) {
            fetch(`${BASE_URL}get-trans/?from=${date.from}&to=${date.to}&ordering=-id`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    store.state.trans = data['results'];
                    console.log(data)
                });
        },
        postAdmin(store, form) {
            this.formData = new FormData();
            for (const name in form) {
                this.formData.append(name, form[name]);
            }
            fetch(`${BASE_URL}auth/token/login/`,{
                method: 'POST',
                body: this.formData,
            })
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    if (data.auth_token) {
                        store.state.token = data.auth_token
                    }
                })
        },

},

mutations: {
    setItems(state, items)
    {
        state.items = items;
    },
    addToBasket(state, index) {
        state.basket.unshift(state.items[index])
    },
    removeFromBasket(state, index) {
        state.basket.splice(index, 1)
    },
    removeBasket(state) {
        state.basket = []

    }


}
,

getters:{
    incomeFinal(state) {
        try {
            let final = 0
            for (const i of state.trans.filter(item => item.type === "INCOME")) {
                final += i.sum
            }
            return final
        } catch (e) {
            return 0
        }
    },


    outcomeFinal(state) {
        try {
            let final = 0;
            for (const i of state.trans.filter(item => item.type === "OUTCOME")) {
                final += i.sum
            }
            return final
        } catch (e) {
            return 0
        }
    },
    transactionsFiltered(state) {
        try {
            if (state.type !== "") {
                return state.trans.filter((transaction) => transaction.type === state.type)
            }
            return state.trans
        } catch (e) {
            return []
        }
    },
   overPrice(state){
        try {
            let final = 0
            state.basket.forEach((item) => {
                final += item.price
            });
            return final
        }
       catch (e) {
           return []
       }

   }
},


})
;

export default store
