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
            activeItem: {}
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


        getOutcome(store) {
            fetch(`${BASE_URL}out-trans/?ordering=-id&limit=${PAGING_LIMIT}&offset=${store.state.outcomeListOffset}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    store.state.outcome = data['results']
                    // store.commit('setOutcome', data)
                });
        },
        // postItem(store, form) {
        //     const BASE_URL = "http://192.168.4.69:8000/";
        //     this.formData = new FormData();
        //     this.formData.append("name", this.form.name);
        //     this.formData.append("price", this.form.price);
        //     this.formData.append("count", this.form.count);
        //     this.formData.append("percent", this.form.percent);
        //     this.formData.append("file", this.form.file);
        //     this.formData.append("min_percent", this.form.min_percent);
        //     this.formData.append("desc", this.form.desc);
        //     fetch(`${BASE_URL}item/`, {
        //         method: 'POST',
        //         body: this.formData,
        //     })
        //         .then((responseJSON) => {
        //             console.log(responseJSON)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //


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
        postOutcome(store, form) {
            // this.formData = new FormData();
            // this.formData.append("name", form.name);
            // this.formData.append("price", form.price);
            form.sum = parseInt(form.sum)
            console.log(form)
            fetch(`${BASE_URL}trans/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: form,
            })
                .then((resJSON) => {
                    console.log(resJSON)
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

        // setOutcome(state, out) {
        //     state.outcome = out
        // }


    },
});

export default store
