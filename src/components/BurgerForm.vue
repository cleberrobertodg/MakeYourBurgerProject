<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do Cliente:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="input-container">
                    <label for="bebida">Escolha a bebida:</label>
                    <select name="bebida" id="bebida" v-model="bebida">
                        <option value="">Selecione a sua bebida</option>
                        <option v-for="bebida in bebidas" :key="bebida.id" :value="bebida.tipo">{{ bebida.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="batata">Escolha a batata:</label>
                    <select name="batata" id="batata" v-model="batata">
                        <option value="">Selecione a sua batata</option>
                        <option v-for="batata in batatas" :key="batata.id" :value="batata.tipo">{{ batata.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu burger:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione o tipo de carne</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <label id="opcionais-title" for="opcionais">Escolha os opcionais:</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{ opcional.tipo }}</span>
                    </div>
                </div>
                
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu Burger!">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Message from './Message';

    export default{
        name: "BurgerForm ",
        data(){
            return{
                paes: null,
                carnes: null,
                opcionaisdata: null,
                batatas: null,
                bebidas: null,
                nome: null,
                pao: null,
                carne: null,
                opcionais: [],
                batata: null,
                bebida: null,
                msg: null
            }
        },
        methods: {
            async getIngredientes(){

                const req = await fetch("http://localhost:3000/ingredientes");
                const data = await req.json();

                this.paes = data.paes
                this.carnes = data.carnes
                this.opcionaisdata = data.opcionais
                this.batatas = data.batatas
                this.bebidas = data.bebidas

            },
            async createBurger(e){

                e.preventDefault();

                const data = {
                    nome: this.nome,
                    carne: this.carne,
                    pao: this.pao,
                    batata: this.batata,
                    bebida: this.bebida,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado"
                }
                
                const dataJson = JSON.stringify(data);

                const req = await fetch("http://localhost:3000/burgers", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"}, 
                    body: dataJson
                });

                const res  = await req.json();

                //coloca msg no sistema
                this.msg = `Pedido N° ${res.id} realizado com sucesso`
                //Limpa msg
                setTimeout(()=> this.msg = "", 3000)

                // Limpa o formulário
                this.nome = "";
                this.carne = "";
                this.pao = "";
                this.batata = "";
                this.bebida = "";
                this.opcionais = [];

                

            }
        },
        mounted(){
            this.getIngredientes()
        },
        components: {
            Message
        }
    }
</script>

<style scoped>
    #burger-form{
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #fcba03;
    }

    input, select{
        padding: 5px 10px;
        width: 300px;
    }

    #opcionais-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    #opcionais-title{
        width: 100%;
    }

    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20%;
    }

    .checkbox-container span,
    .checkbox-container input{
        width: auto;
    }

    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn{
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

    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>