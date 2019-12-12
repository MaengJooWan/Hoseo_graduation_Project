<template>
    <b-modal id="modal-1" title="로그인">
        <div class="container">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="close" @click="$emit('close')">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <form action="http://127.0.0.1:3000/login" accept-charset="utf-8" name="login" method="post">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <p style="width: 120px" class="input-group-text mx-auto d-block">아이디</p>
                                </div>
                                <input type="email" name="email" v-model="email" placeholder="email"/>
                            </div>
                            <div class="input-group" style="margin-top: 5px;">
                                <div class="input-group-prepend">
                                    <p style="width: 120px;" class="input-group-text mx-auto d-block">비밀번호</p>
                                </div>
                                <input type="password" name="password" v-model="password" placeholder="password"/>
                            </div>
                            <button type="submit" class="btn btn-success float-right" style="margin-top: 5px" @click="login">로그인</button>
                        </form>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <div class="col-sm-12" style="margin-top: 5px; float: right">
                            <button type="button" class="btn btn-outline-success" @click="idsearch" style="float: right;">아이디 찾기</button>
                            <button type="button" class="btn btn-outline-success" @click="pwsearch" style="margin-right: 5px; float: right">비밀번호 찾기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>


<script>
export default {
  data:function(){
      return {
          email:'',
          password: ''
      }
  },props : [
      'hot_table',
  ],methods : {
      async login() {

          //this.$emit('close')
      },
      async idsearch() {

      },
      async pwsearch() {

      }
  }
}
</script>