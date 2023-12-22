<script setup>
import {computed, onMounted, ref} from "vue";
import parts from "@/data/parts.js";
import {toCurrency} from "@/shared/formatters.js";

onMounted(() => {
  console.log('Component mounted');
})

function getPrevCycleIndex(index, maxIdx) {
  if (index == 0) {
    index = maxIdx;
  }
  return index - 1;
}

function getNextCycleIndex(index, maxIdx) {
  if (index == maxIdx - 1) {
    index = -1;
  }
  return index + 1;
}

const availableParts = parts;
const selectedHeadIndex = ref(0);
const selectedLeftArmIndex = ref(0);
const selectedTorsoIndex = ref(0);
const selectedRightHandIndex = ref(0);
const selectedBottomIndex = ref(0);
const cart = ref([]);

const selectedRobot = computed(() => ({
  head: availableParts.heads[selectedHeadIndex.value],
  leftArm: availableParts.heads[selectedLeftArmIndex.value],
  torso: availableParts.heads[selectedTorsoIndex.value],
  rightArm: availableParts.heads[selectedRightHandIndex.value],
  bottom: availableParts.heads[selectedBottomIndex.value],
}));

function selectObj(idx, len, nextOrPrev) {
  if (nextOrPrev)
    return getPrevCycleIndex(idx, len);
  else
    return getNextCycleIndex(idx, len);
};

function addToCart() {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
    robot.leftArm.cost +
    robot.torso.cost +
    robot.rightArm.cost +
    robot.bottom.cost;
  cart.value.push({...robot, cost});
  console.log(cart.value);
}

const headBorderStyle = computed(() => ({border: selectedRobot.value.head.onSale?'3px solid':'3px solid'}));
const headBorderColor = computed(() => ({border: selectedRobot.value.head.onSale?'red':'green'}));

console.log("component created");
</script>

<template>
  <div>
    <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    <div class="top-row">
      <div class="top part" :style="headBorderStyle">

        <div class="robot-name">{{ selectedRobot.head.title }}
          <span class="sale" v-show="selectedRobot.head.onSale">sale!</span>
        </div>
        <img :src="selectedRobot.head.imageUrl" alt="head"/>

        <button class="prev-selector"
                @click="selectedHeadIndex=selectObj(selectedHeadIndex, availableParts.heads.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                @click="selectedHeadIndex=selectObj(selectedHeadIndex, availableParts.heads.length, false)">
          &#9658;
        </button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img v-bind:src="availableParts.arms[selectedLeftArmIndex].imageUrl" alt="left arm"/>
        <button class="prev-selector"
                v-on:click="selectedLeftArmIndex=selectObj(selectedLeftArmIndex, availableParts.arms.length, true)">
          &#9650;
        </button>
        <button class="next-selector"
                v-on:click="selectedLeftArmIndex=selectObj(selectedLeftArmIndex, availableParts.arms.length, false)">
          &#9660;
        </button>
      </div>
      <div class="center part">
        <img v-bind:src="availableParts.torsos[selectedTorsoIndex].imageUrl" alt="torso"/>
        <button class="prev-selector"
                v-on:click="selectedTorsoIndex=selectObj(selectedTorsoIndex, availableParts.torsos.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                v-on:click="selectedTorsoIndex=selectObj(selectedTorsoIndex, availableParts.torsos.length, false)">
          &#9658;
        </button>
      </div>
      <div class="right part">
        <img v-bind:src="availableParts.arms[selectedRightHandIndex].imageUrl" alt="right arm"/>
        <button class="prev-selector"
                v-on:click="selectedRightHandIndex=selectObj(selectedRightHandIndex, availableParts.arms.length, true)">
          &#9650;
        </button>
        <button class="next-selector"
                v-on:click="selectedRightHandIndex=selectObj(selectedRightHandIndex, availableParts.arms.length, false)">
          &#9660;
        </button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img v-bind:src="availableParts.bases[selectedBottomIndex].imageUrl" alt="base"/>
        <button class="prev-selector"
                v-on:click="selectedBottomIndex=selectObj(selectedBottomIndex, availableParts.bases.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                v-on:click="selectedBottomIndex=selectObj(selectedBottomIndex, availableParts.bases.length, false)">
          &#9658;
        </button>
      </div>
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

.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid red //v-bind(headBorderColor)
}

.part img {
  width: 200px;
}

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

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg) scaleX(-1);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

.add-to-cart {
  position: absolute;
  margin-left: 600px;
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
</style>
