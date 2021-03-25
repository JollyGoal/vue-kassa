import {createStore} from 'vuex'

const BASE_URL = "http://192.168.4.69:8000/";
const PAGING_LIMIT = 20;

const store = createStore({
    state() {
        return {
            items: [],
            itemListOffset: 0,
            query: "",
            outcome: [],
            outcomeListOffset: 0,
            activeItem: {},
        }
    },
    actions: {
        getItems(store, limit) {
            store.commit('setItems', [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]);
            fetch(`${BASE_URL}get-item/?search=${store.state.query}&ordering=-id&limit=${limit}&offset=${store.state.itemListOffset}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data['results'].length === 0) {
                        store.commit('setItems', [{id: "Товаров", name: "в базе", price: "не", count: "найдено"}]);
                    } else {
                        store.commit('setItems', data['results'])
                    }
                    if (data.count > limit) {
                        console.log(PAGING_LIMIT);
                        console.log(data.count);
                        store.state.items(data.count)
                    }
                });
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
                    if (store.state.items[store.state.items.length - 1].id === "Товаров") {
                        store.state.items.pop(-1)
                    }
                })
                // .catch((err) => {
                //     console.log(err)
                // })
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
        }

    },

    mutations: {
        setItems(state, items) {
            state.items = items;
        },
    },


});

export default store
