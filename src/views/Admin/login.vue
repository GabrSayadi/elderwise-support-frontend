<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="admin__login">
        
        <div class="admin__login__left">
            <img :src="loginLeft" alt="">
        </div>

        <div class="admin__login__right">
            <div class="admin__login__right-title">欢迎来老有所联后台管理</div>
            <input v-model="data.userName" type="text" placeholder="User Name">
            <input v-model="data.password" :type="showPassword" placeholder="密码">
            <div class="show__password" @click="changeShowPassword">{{ data.showPassword === true ? '隐藏密码' : '显示密码'}}</div>
            <div class="admin__login__right-btn" @click="login">登录</div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router/admin-router';
import loginLeft from '@/assets/image/admin/login_left.svg'
import { reactive, computed } from 'vue';
import { loginReq } from '@/api/index';
import { showToast } from 'vant';

const data = reactive({
    userName: '',
    password: '',
    showPassword: false
})

const comLogin = () => {
    router.push('/');
}

const changeShowPassword = () => {
    data.showPassword = !data.showPassword;
}

const showPassword = computed(() => {
    if (data.showPassword === true)
        return 'text';
    return 'password';
})


const login = () => {
    loginReq({
        "userAccount":data.userName,
        "userPassword": data.password
    }).then(
        res => {
            if (res.code.toString() === '0' && res.msg.toString() === 'success') {
                console.log(res.token);
                localStorage.setItem('adminToken', res.token);
                localStorage.setItem('adminId', res.data.length === 0 ? 0 : res.data[0].id);
                localStorage.setItem('adminAccount', res.data.length === 0 ? '' : res.data[0].userAccount);
                showToast('登录成功');
                comLogin();
                return;
            }
            showToast('请再次输入您的信息');
        }
    ).catch(error => {
        console.error('Login error:', error);
        showToast('请再次输入您的信息');
    });
}

</script>

<style lang="stylus" scoped>
$m_l_q = 768px

.admin__login
    width: 100%
    height: 100vh
    display: flex
    justify-content: space-around
    align-items: center

    &__left
        width: 50%
        height: 100%
        padding: 0 10%
        &>img
            width: 100%
            height: 100%
            object-fit: contain

    &__right
        width: 50%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        &-title
            font-size: 30px
            font-weight: 600
            margin-bottom: 20px
        &>input
            width: 300px
            height: 40px
            border-radius: 5px
            border: 1px solid #ccc
            margin-bottom: 20px
            padding-left: 10px
        &-btn
            width: 300px
            height: 40px
            background-color: #065F46
            border-radius: 5px
            color: #fff
            border: 1px solid #fff
            margin-bottom: 20px
            padding-left: 10px
            display: flex
            justify-content: center
            align-items: center
            cursor: pointer
            
@media (max-width: $m_l_q)
    .admin__login
        &__left
            display: none


.show__password
    padding-bottom: 10px
    font-size: 14px
    color: blue
    cursor: pointer

</style>


