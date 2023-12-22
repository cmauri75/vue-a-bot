<script setup>
import PartSelector from "@/build/PartSelector.vue";
import {ref} from "vue";
import parts from "@/data/parts.js";
import {toCurrency} from "@/shared/formatters.js";
import CollapsableSection from "@/shared/CollapsableSection.vue";


const availableParts = parts;
const cart = ref([]);

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
  cart.value.push({...robot, cost});
}

console.log("component created");
</script>

<template>
  <div class="content">
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
      <PartSelector :parts="availableParts.heads" position="top"
                    @partSelected="part=>selectedRobot.head=part"/>
    </div>
    <div class="middle-row">
      <PartSelector :parts="availableParts.arms" position="left"
                    @partSelected="part=>selectedRobot.leftArm=part"/>
      <PartSelector :parts="availableParts.torsos" position="center"
                    @partSelected="part=>selectedRobot.torso=part"/>
      <PartSelector :parts="availableParts.arms" position="right"
                    @partSelected="part=>selectedRobot.rightArm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases" position="bottom"
                    @partSelected="part=>selectedRobot.bottom=part"/>
    </div>
    <span v-if="cart.length>0">
    <h1>Cart</h1>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Robot</th>
        <th class="cost">Cost</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(robot,index) in cart" :key="index">
          <td>{{ index }}</td>
          <td>{{ robot.head.title }}</td>
          <td class="cost">{{ toCurrency(robot.cost) }}</td>
        </tr>
      </tbody>
    </table>
      </span>
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
