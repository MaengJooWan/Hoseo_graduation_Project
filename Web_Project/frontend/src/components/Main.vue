<template>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="background-color: #34a853; margin-bottom: 0px">
            <a class="navbar-brand" href="/"><span style="color: white">Smart ERP</span></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    style="background-color: white">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="color: white" href="#" id="navbardrop"
                        data-toggle="dropdown">
                            상품관리
                        </a>
                        <div class="dropdown-menu" style="background-color: white;">
                            <a class="dropdown-item" style="color: #34a853" href="/recive_management">입고관리</a>
                            <a class="dropdown-item" style="color: #34a853" href="/forward_management">출고관리</a>
                            <a class="dropdown-item" style="color: #34a853" href="/inventory_management">재고관리</a>
                            <a class="dropdown-item" style="color: #34a853" href="/quality_management">품질관리</a>
                            <a class="dropdown-item" style="color: #34a853" href="/expiration_of_validity_period">유효기간 경과 품목</a>
                            <a class="dropdown-item" style="color: #34a853" href="/order_registration">발주 등록</a>
                            <a class="dropdown-item" style="color: #34a853" href="/order_stanby">발주 대기/승인</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="color: white" href="#" id="navbardrop"
                        data-toggle="dropdown">
                            스마트관리
                        </a>
                        <div class="dropdown-menu" style="background-color: white;">
                            <a class="dropdown-item" style="color: #34a853" href="/inventory_location">재고(제품)위치</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="color: white" href="#" id="navbardrop"
                        data-toggle="dropdown">
                            인사관리
                        </a>
                        <div class="dropdown-menu" style="background-color: white;">
                            <a class="dropdown-item" style="color: #34a853" href="/personnel_information">인사정보</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="color: white" href="#" id="navbardrop"
                        data-toggle="dropdown">
                            조회관리
                        </a>
                        <div class="dropdown-menu" style="background-color: white;">
                            <a class="dropdown-item" style="color: #34a853" href="/receiving_quantity_graph">입고량 조회</a>
                            <a class="dropdown-item" style="color: #34a853" href="/forwarding_quantity_graph">출고량 조회</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/connect_chat"><span style="color: white">메신저</span></a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-light" @click="search">검색</button>
                    <modals-container />
                    <button class="btn btn-outline-light" style="margin-left: 5px" @click="login">로그인</button>
                </form>
            </div>
        </nav>
    </body>
</template>


<script>
import DelPopup from './Login.vue'
export default {
    mounted(){
        this.login();
    },
    data () {
     return {
     }
    },
    methods : {
       login: function (event) {
            this.$modal.show(DelPopup,{
                hot_table : 'data',
                modal : this.$modal },{
                    name: 'dynamic-modal',
                    width : '500px',
                    height : '340px',
                    draggable: true,
            })
            alert(event.target.tagName)
        }
    }
}
</script>

<style scoped>

</style>