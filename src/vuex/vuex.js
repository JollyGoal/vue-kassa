import {createStore} from 'vuex'

const BASE_URL = "http://192.168.4.69:8000/";
const PAGING_LIMIT = 20
const store = createStore({
    state() {
        return {
            items: [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}],
            itemListOffset: 0,
            itemsCount: 2,
            query: "",
            outcome: [],
            outcomeListOffset: 0,
            activeItem: {},
        }

    },
    actions: {
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
                            }
                            else {
                                console.log(data)
                                store.commit('setItems', data['results'])
                            }

                            store.state.itemsCount = data.count
                            store.state.itemListOffset++
                        } else {
                            store.state.items = [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]
                        }
                    });
            }
        },
        getOutcome(store) {
            fetch(`${BASE_URL}out-trans/?ordering=-id&limit=${PAGING_LIMIT}&offset=${store.state.outcomeListOffset}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
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
                    'Content-Type': 'application/json'
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
        postUpdateItem(store, options){
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
        }
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },

    },


});

export default store
