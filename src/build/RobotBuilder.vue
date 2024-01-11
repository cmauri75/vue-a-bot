<script setup>
import {ref} from "vue";

import CollapsableSection from "@/shared/CollapsableSection.vue";
import PartSelector from "@/build/PartSelector.vue";

import {toCurrency} from "@/shared/formatters.js";

import {usePartStore} from "@/stores/partStore.js";
import {useCartStore} from "@/stores/cartStore.js";

const partStore = usePartStore();
await partStore.getParts();

const cartStore = useCartStore();

const selectedRobot = ref(({
  head: {},
  leftArm: {},
  torso: {},
  rightArm: {},
  bottom: {},
}));

function addToCart() {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
    robot.leftArm.cost +
    robot.torso.cost +
    robot.rightArm.cost +
    robot.bottom.cost;
  cartStore.cart.push({...robot, cost});
  cartStore.lastRobotCost = cost;
}

console.log("component created");
</script>
<template>
  <div>Number of heads: {{ partStore.parts ? partStore.parts.heads.length : "n/d" }}</div>
  <div>version: {{ partStore.getVersion() }}</div>

  <div class="content" v-if="partStore.parts">
    <div class="preview">
      <CollapsableSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.imageUrl" class="rotate-left"/>
            <img :src="selectedRobot.torso.imageUrl"/>
            <img :src="selectedRobot.rightArm.imageUrl" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.bottom.imageUrl"/>
          </div>
        </div>
      </CollapsableSection>
    </div>

    <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    <div class="top-row">
      <div class="robot-name">{{ selectedRobot.head.title }}
        <span class="sale" v-show="selectedRobot.head.onSale">sale!</span>
      </div>
      <PartSelector :parts="partStore.parts.heads" position="top"
                    @partSelected="part=>selectedRobot.head=part"/>
    </div>
    <div class="middle-row">
      <PartSelector :parts="partStore.parts.arms" position="left"
                    @partSelected="part=>selectedRobot.leftArm=part"/>
      <PartSelector :parts="partStore.parts.torsos" position="center"
                    @partSelected="part=>selectedRobot.torso=part"/>
      <PartSelector :parts="partStore.parts.arms" position="right"
                    @partSelected="part=>selectedRobot.rightArm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="partStore.parts.bases" position="bottom"
                    @partSelected="part=>selectedRobot.bottom=part"/>
    </div>
    <h3> Last Robot cost: {{ toCurrency(cartStore.lastRobotCost) }}</h3>
  </div>

</template>

<style scoped>
.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.add-to-cart {
  position: absolute;
  margin-left: 500px;
  width: 310px;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
}

td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}

</style>
