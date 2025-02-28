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
                        
                        <option v-for="bebida in bebidas" :key="bebida.id" :value="bebida.tipo">{{ bebida.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="batata">Escolha o acompanhamento:</label>
                    <select name="batata" id="batata" v-model="batata">
                        
                        <option v-for="batata in batatas" :key="batata.id" :value="batata.tipo">{{ batata.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne:</label>
                    <select name="carne" id="carne" v-model="carne">
                        
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a quantidade de carnes:</label>
                    <select name="qtd-carne" id="qte-carne" v-model="qtdCarne">
                        
                        <option v-for="qtdCarne in qtdCarnes" :key="qtdCarne.id" :value="qtdCarne.tipo">{{ qtdCarne.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="queijo">Escolha o queijo:</label>
                    <select name="queijo" id="queijo" v-model="queijo">
                        
                        <option v-for="queijo in queijos" :key="queijo.id" :value="queijo.tipo">{{ queijo.tipo }}</option>
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
                    <label for="sobremesa">Escolha sua sobremesa:</label>
                    <select name="sobremesa" id="sobremesa" v-model="sobremesa">
                        
                        <option v-for="sobremesa in sobremesas" :key="sobremesa.id" :value="sobremesa.tipo">{{ sobremesa.tipo }}</option>
                    </select>
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

export default {
    name: "BurgerForm",
    data() {
        return {
            paes: null,
            carnes: null,
            qtdCarnes: null,
            queijos: null,
            opcionaisdata: null,
            sobremesas: null,
            batatas: null,
            bebidas: null,
            nome: null,
            pao: null,
            carne: null,
            qtdCarne: null,
            queijo: null,
            opcionais: [],
            sobremesa: null,
            batata: null,
            bebida: null,
            msg: null
        }
    },
    methods: {
        async getIngredientes() {
            // Fazendo uma requisição para o backend para obter os ingredientes
            const res = await fetch("http://localhost:3000/ingredientes");
            const data = await res.json();

            console.log("DB::::", { data });

            this.paes = data.paes;
            this.carnes = data.carnes;
            this.qtdCarnes = data.qtdCarnes;
            this.queijos = data.queijos;
            this.opcionaisdata = data.opcionais;
            this.sobremesas = data.sobremesas;
            this.batatas = data.batatas;
            this.bebidas = data.bebidas;
        },
        async createBurger(e) {
            e.preventDefault();

            const data = {
                nome: this.nome,
                carne: this.carne,
                qtdCarne: this.qtdCarne,
                queijo: this.queijo,
                pao: this.pao,
                batata: this.batata,
                bebida: this.bebida,
                opcionais: Array.from(this.opcionais),
                sobremesa: this.sobremesa,
                status: "Solicitado"
            };

            const dataJson = JSON.stringify(data);

            // Requisição POST para o servidor backend
            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            const res = await req.json();

            // Mensagem de sucesso
            this.msg = `Pedido N° ${res.id} realizado com sucesso`;

            // Limpa a mensagem após 2 segundos
            setTimeout(() => (this.msg = ""), 2000);

            // Limpa o formulário
            this.nome = "";
            this.carne = "";
            this.qtdCarne = "";
            this.queijo = "";
            this.pao = "";
            this.batata = "";
            this.bebida = "";
            this.opcionais = [];
            this.sobremesas = "";

            // Redireciona para a página de pedidos após 2 segundos
            setTimeout(() => (window.location.href = "/pedidos"), 2000);
        }
    },
    mounted() {
        this.getIngredientes();
    },
    components: {
        Message
    }
};
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
        margin-bottom: 5%;
    }

    /* #sobremesas-container{
        flex-direction: row;
        flex-wrap: wrap;
    } */

    #sobremesas-title{
        width: 100%;
        margin-bottom: 5%;
    }

    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 5%;
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
        /* margin: 0 auto; */
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>