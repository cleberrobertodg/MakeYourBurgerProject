<template>
    <div id="burger-table">
        <Message :msg="msg" v-show="msg" />
        <div>
            <div id="burger-table-heading">
                <div class="order id">Pedido:</div>
                <div>Cliente:</div>
                <div>Bebida:</div>
                <div>Batata:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Qtd Carnes:</div>
                <div>Queijo:</div>
                <div>Opcionais:</div>
                <div>Sobremesa:</div>
                <div>Status:</div>
                
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome }}</div>
                <div>{{ burger.bebida }}</div>
                <div>{{ burger.batata }}</div>
                <div>{{ burger.pao }}</div>
                <div>{{ burger.carne }}</div>
                <div>{{ burger.qtdCarne }}</div>
                <div>{{ burger.queijo }}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <div>{{ burger.sobremesa }}</div>
                <div class="selects">
                    <select name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option value="">Selecione</option>
                        <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">{{ s.tipo }}</option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import Message from './Message';
export default {
    name: "Dashboard",
    data(){
        return{
            burgers: null,
            burger_id: null,
            status: [],
            msg: null
        }
    },
    components: {
        Message
    },
    methods: {
        async getPedidos(){

            const req = await fetch("http://localhost:3000/burgers");

            const data = await req.json();

            this.burgers = data;

            

            //Resgatar os status
            this.getStatus()
        },

        async getStatus(){

            const req = await fetch("http://localhost:3000/status");

            const data = await req.json();

            this.status = data;

            

        },
        async deleteBurger(id){
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
            method: "DELETE"});
            const res = await req.json();

            //coloca msg no sistema
            this.msg = `Pedido N° ${res.id} removido com sucesso!`
            
            //Limpa msg
            setTimeout(()=> this.msg = "", 3000)

            //Msg de delete do pedido

            this.getPedidos();
        },
        async updateBurger(event, id) {

            const option = event.target.value;

            const dataJson = JSON.stringify({status: option});

            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });

            const res = await req.json();

            //coloca msg no sistema
            this.msg = `O pedido N° ${res.id} foi atualizado para: ${res.status}!`
            
            //Limpa msg
            setTimeout(()=> this.msg = "", 3000)

            console.log(res)

        }
    },
    mounted(){
        this.getPedidos();
    }
}
</script>

<style scoped>

    #burger-table{
        max-width: 1200px;
        margin: 0 auto;
        
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between
    }

    #burger-table-heading{
        font-weight: bold;
        border-bottom: 3px solid #333;
        width: 100%;
        
    }

    #burger-table-heading div,
    .burger-table-row div{
        width: 5%;
        margin: 20px;
    }

    .burger-table-row{
        width: 100%;
        padding-top: 12px;
        border-bottom:2px solid #ccc;
    }

    #burger-table-heading .order-id,
    .burger-table.row .order-number{
        width: 5%;
    }

    /* .selects{
        display: flex;
        flex-direction: column;
        max-height: 40px;
    } */

    select{
        padding: 12px 0px;
        margin-right: 12px;
        width: 90px;
        margin-bottom: 20px;
    }

    .delete-btn{
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .delete-btn:hover{
        color: #222;
        background-color: transparent;
    }

    .burger-table-row ul{
        list-style: none;
    }

    li{
        margin-bottom: 10px;
    }
</style>