<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="register__info">
        <div class="register__info__tab">
            <div @click="goBack" class="register__info__tab__back">
                <van-icon name="arrow-left" />
            </div>
            <div class="register__info__tab__title">住院</div>
        </div>
        <div class="register__info__box" v-if="lenOfInfo">
            <div class="register__info__box__types">
                <div 
                v-for="(item, index) in types"
                :key="index" 
                class="register__info__box__types__item"
                :class="{ active: type === index }"
                @click="showType(index)">{{ item.name }}</div>
            </div>
            <div 
                v-for="(item, index) in data.hospital"
                :key="index"
                class="register__info__box__body">
                <div
                    v-if="type === 0"
                    class="register__info__box__body__item">
                    <div v-if="item.medicineType === 'neike' || item.medicineType === '内科'">
                        <div class="register__info__box__body__item__img">
                            <img :src="item.roomImgUrl" alt="">
                        </div>
                        <div class="register__info__box__body__item__name">每日费用：{{ item.fee }}元</div>
                        <div class="register__info__box__body__item__name">楼层：{{ item.floorNumber }}</div>
                        <div class="register__info__box__body__item__name">房间类别: {{ item.roomType }}</div>
                        <div class="register__info__box__body__item__name">房间号: {{ item.roomNumber }}</div>
                        <div class="register__info__box__body__item__name">床位数: {{ item.bedNumber }}</div>
                        <div
                            @click="registerEvent(item)"
                            class="register__info__box__body__item__btu"
                            >立刻预约</div>
                    </div>
                </div>
                <div
                    v-else-if="type === 1"
                    class="register__info__box__body__item">
                    <div v-if="item.medicineType === 'waike' || item.medicineType === '外科'">
                        <div class="register__info__box__body__item__img">
                            <img :src="item.roomImgUrl" alt="">
                        </div>
                        <div class="register__info__box__body__item__name">每日费用：{{ item.fee }}元</div>
                        <div class="register__info__box__body__item__name">楼层：{{ item.floorNumber }}</div>
                        <div class="register__info__box__body__item__name">房间类别: {{ item.roomType }}</div>
                        <div class="register__info__box__body__item__name">房间号: {{ item.roomNumber }}</div>
                        <div class="register__info__box__body__item__name">床位数: {{ item.bedNumber }}</div>
                        <div
                            @click="registerEvent(item)"
                            class="register__info__box__body__item__btu"
                            >立刻预约</div>
                    </div>
                </div>
                <div
                    v-else-if="type === 2"
                    class="register__info__box__body__item">
                    <div v-if="item.medicineType === 'erke' || item.medicineType === '儿科'">
                        <div class="register__info__box__body__item__img">
                            <img :src="item.roomImgUrl" alt="">
                        </div>
                        <div class="register__info__box__body__item__name">每日费用：{{ item.fee }}元</div>
                        <div class="register__info__box__body__item__name">楼层：{{ item.floorNumber }}</div>
                        <div class="register__info__box__body__item__name">房间类别: {{ item.roomType }}</div>
                        <div class="register__info__box__body__item__name">房间号: {{ item.roomNumber }}</div>
                        <div class="register__info__box__body__item__name">床位数: {{ item.bedNumber }}</div>
                        <div
                            @click="registerEvent(item)"
                            class="register__info__box__body__item__btu"
                            >立刻预约</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <van-empty description="暂无数据" />
        </div>
    </div>
    <van-popup 
        v-model:show="showPop"
        round
        position="bottom"
        :style="{ width: '100%', height: 'auto'}">
        <CheckIn :item="data.item" />
    </van-popup>

</template>

<script setup>

import { roomListByHospital } from '@/api';
import CheckIn from '@/components/mobile/popups/checkin.vue'
import router from '@/router/co-router';
import { reactive, ref, onMounted,watchEffect, computed } from 'vue'

const type = ref(0)
const types = reactive([
    {
        name: '内科',
        id: 0
    },
    {
        name: '外科',
        id: 1
    },
    {
        name: '儿科',
        id: 2
    }
])

const data = reactive({
    hospital: [
        {
                "id": 1,
                "hospitalId": 1,
                "createUser": 1,
                "medicineType": "neike",
                "roomType": "vip",
                "bedNumber": 100,
                "floorNumber": 5,
                "roomNumber": 501,
                "fee": 500,
                "reservationAt": "2023-05-26T04:25:00.000Z",
                "updateAt": "2023-05-26T04:25:00.000Z",
                "checkInAt": "2023-03-25T16:00:00.000Z",
                "checkOutAt": "2023-03-25T16:00:00.000Z",
                "paymentStatus": 0
        },
    ],
    item: {}
})

const showType = (index) => {
    type.value = index
}

const goBack = () => {
    router.push('/main')
}

const showPop = ref(false);

const goRegister = () => {
    showPop.value = true;
}

// check empty
const lenOfInfo = computed(() => {
    if (data.hospital.length === 0)
        return false
    return true
})

onMounted(() => {
    const query = router.currentRoute.value.params.id;
    const url = `/rooms/hospital/${query}`
    roomListByHospital(url).then(res => {
        if (res.code.toString() === '0' && res.msg.toString() === 'success') {
            watchEffect(() => {
                data.hospital = res.data.data
            })
        }
    }).catch(err => {
        console.log(err);
    })
})

const registerEvent = (item) => {
    data.item = item
    goRegister()
}
</script>

<style lang="stylus" scoped>
.register__info
    background-color #f9f9f9
    width 100%
    height 100%
    &__tab
        width 100%
        height 50px
        background-color rgb(6 95 70)
        display flex
        align-items center
        justify-content start
        &__back
            width 50px
            height 50px
            display flex
            align-items center
            justify-content center
            & i
                font-size 20px
                color #fff
        &__title
            font-size 18px
            color #fff
            margin-left 33.3%
        
    &__box
        width 100%
        height 100%
        padding 10px 0

        &__types
            width 100%
            height 40px
            display flex
            margin-bottom 20px
            align-items center
            justify-content space-around
            &__item
                width 30%
                height 100%
                display flex
                align-items center
                justify-content center
                font-size 16px
                color #333
                border-radius 25px
                box-shadow: 0 20px 50px -12px rgb(0 0 0 / 0.25);
                &.active
                    color #fff
                    background-color rgb(6 95 70)

        &__body
            width 90%
            margin 0 0 5px 10px
            &__item
                width 100%
                border-radius 10px
                box-shadow: 0 20px 50px -12px rgb(0 0 0 / 0.25);
                &__img
                    width 100%
                    height 200px
                    display flex
                    justify-content center
                    & > img 
                        width 100%
                        height 100%
                        border-radius 10px 10px 0 0
                &__name
                    display flex
                    justify-content center
                    align-items center
                    padding 5px
                    font-size 16px
                &__desc
                    display flex
                    justify-content center
                    align-items center
                    padding 5px
                    font-size 14px
                    color #999
                &__btu
                    display flex
                    justify-content center
                    align-items center
                    padding 15px
                    font-size 16px
                    color #fff
                    background-color rgb(6 95 70)
                    border-radius 0 0 10px 10px

.register__info__box__body__item:not(:last-child)
    margin-top 10px

.mt-10
    margin-top 10px
        
</style>