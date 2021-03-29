<template>
    <div id="static">
        <div class="static">
            <div class="static_wrap">
                <div class="row" style="display: flex;">
                    <div class="col">
                        <div class="count">
                            <div class="count_body">
                                <div class="count_head">
                                    <div>Доход</div>
                                </div>
                                <div class="count_title">
                                    <span>55555</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="count">
                            <div class="count_body">
                                <div class="count_head">
                                    <div>Расход</div>
                                </div>
                                <div class="count_title">
                                    <span>5555555</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="count third__count">
                            <div class="count_body">
                                <div class="count_head">
                                    <div>Прибыль</div>
                                </div>
                                <div class="count_title">
                                    <span>55555</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row second__row">
                    <div class="col">
                        <input type="date" v-model="date.from" name="dateStart" ref="dateStart" class="mb date_input">
                    </div>
                    <div class="col second__row__second__col">
                        <input type="date" name="dateEnd" v-model="date.to" ref="dateEnd" class="mb date_input">
                    </div>

                    <div class="col">
                        <div class="submit" @click="getDataSearch"><i class="fas fa-search"></i> Поиск</div>
                    </div>
                    <div class="col">
                        <button class="submit"><i class="fas fa-sliders-h"></i> Фильтр
                        </button>
                    </div>
                </div>

                <div class="row third__row" style=" position:relative;">
                    <div class="col first__column" style="width: 80%; height:  343px; margin-right: 10px;">
                        <table style="width: 100%;">
                            <tr>
                                <th>Категория</th>
                                <th>Номер:</th>
                                <th>Наименование:</th>
                                <th>Сумма:</th>
                                <th>Дата:</th>
                            </tr>
                            <tr v-for="(item , index) in $store.state.trans" :key="index">
                                <td>{{item.type}}</td>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.sum}}</td>
                                <td>
                                    {{new Date(item.pub_date).getFullYear()}}.
                                    {{ new Date(item.pub_date).getMonth()+1}}.
                                    {{("0" + new Date(item.pub_date).getDate()).substr(-2)}}


                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    //:value="prev_date.toISOString().substr(0,10)"
    //:value="new Date().toISOString().substr(0,10)"
        name: "Static",
        data() {
            return {
                list: [
                ],
                prev_date: new Date(),
                date:{
                    from: (new Date().setMonth((new Date()).getMonth() - 1)),
                    to:new Date().toISOString().substr(0,10),
                }
            }
        },
        watch: {

        },
        methods:{
            getTrans(){
                this.$store.dispatch('getTransactions', this.date)
            },
           getDataSearch() {
                this.$store.dispatch('getTransactions', this.date);
            },
        },
        created(){
            this.date.from = new Date(this.date.from).toISOString().substr(0,10)
            this.getTrans();


        },

    }
</script>

<style lang="scss" scoped>
    ::-webkit-scrollbar {
        width: 8px;
        height: 5px;
    }

    ::-webkit-scrollbar-track-piece {
        margin: 18px 5px
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        background: #DCDCDC;
        border-radius: 40px;
    }

.count_head{
    font-size: 25px;
    font-family: sans-serif;
    margin-top: 15px;
}
    .static {
        &_wrap {
            width: 1200px;
            margin: 0 auto;
        }

        &_row {
            display: flex;
            align-items: center;
            padding: 60px 0;
            justify-content: center;
        }
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .count {
        width: 200px;
        padding: auto;
        margin-left: 30px;
        color: black;
        text-align: center;

        &_title {
            text-align: center;
            font-size: 24px;
            margin: 20px 0;
            color: white;
            font-family: sans-serif;
            height: 50px;
            background: linear-gradient(180deg, #631FA7 0%, rgba(106, 22, 98, 0.85) 100%);
            border-radius: 20px;
            padding-top: 20px;
        }

        span {
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
        }

    }


    .third__count {
        border: none;
    }

    /* CALENDAR CSS */

    [type="date"] {
        background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
    }

    [type="date"]::-webkit-inner-spin-button {
        display: none;
    }

    [type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
    }

    .date_input {
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px 5px;
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
        width: 190px;
        font-size: 20px;
    }

    .submit {
        background: linear-gradient(180deg, #631FA7 0%, rgba(106, 22, 98, 0.85) 100%);
        color: #ffffff;
        padding: 10px 10px;
        border-radius: 5px;
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
        font-size: 30px;
        margin-right: 20px;
        outline: none;
        border: none;
        cursor: pointer;
        &:hover {
            background: linear-gradient(0deg, #631FA7 0%, rgba(106, 22, 98, 0.85) 100%);
        }
    }

    .second__row {
        margin: 20px 0;
    }

    .second__row__second__col {
        margin: 0 100px;
    }

    .third__row table {
        border-collapse: collapse;
    }

    .third__row table td, table th {
        border: 1px solid black;
        padding: 10px;
    }

    .third__row button {
        padding: 20px 10px;
        background: #0069d9;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 20px;
    }

    .third__row .first__column {
        overflow-y: scroll;
    }
</style>