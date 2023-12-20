<script>
import parts from "@/data/parts.js";

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

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts: parts,
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedRightHandIndex: 0,
      selectedBottomIndex: 0,
    };
  },
  methods: {
    selectObj(idx, len, nextOrPrev) {
      if (nextOrPrev)
        return getPrevCycleIndex(idx, len);
      else
        return getNextCycleIndex(idx, len);
    }
  }
}
</script>

<template>
  <div>
    <div class="top-row">
      <div class="top part">
        <img v-bind:src="availableParts.heads[selectedHeadIndex].imageUrl" alt="head"/>
        <button class="prev-selector"
                v-on:click="this.selectedHeadIndex=selectObj(this.selectedHeadIndex, this.availableParts.heads.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                v-on:click="this.selectedHeadIndex=selectObj(this.selectedHeadIndex, this.availableParts.heads.length, false)">
          &#9658;
        </button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img v-bind:src="availableParts.arms[selectedLeftArmIndex].imageUrl" alt="left arm"/>
        <button class="prev-selector"
                v-on:click="this.selectedLeftArmIndex=selectObj(this.selectedLeftArmIndex, this.availableParts.arms.length, true)">
          &#9650;
        </button>
        <button class="next-selector"
                v-on:click="this.selectedLeftArmIndex=selectObj(this.selectedLeftArmIndex, this.availableParts.arms.length, false)">
          &#9660;
        </button>
      </div>
      <div class="center part">
        <img v-bind:src="availableParts.torsos[selectedTorsoIndex].imageUrl" alt="torso"/>
        <button class="prev-selector"
                v-on:click="this.selectedTorsoIndex=selectObj(this.selectedTorsoIndex, this.availableParts.torsos.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                v-on:click="this.selectedTorsoIndex=selectObj(this.selectedTorsoIndex, this.availableParts.torsos.length, false)">
          &#9658;
        </button>
      </div>
      <div class="right part">
        <img v-bind:src="availableParts.arms[selectedRightHandIndex].imageUrl" alt="right arm"/>
        <button class="prev-selector"
                v-on:click="this.selectedRightHandIndex=selectObj(this.selectedRightHandIndex, this.availableParts.arms.length, true)">
          &#9650;
        </button>
        <button class="next-selector"
                v-on:click="this.selectedRightHandIndex=selectObj(this.selectedRightHandIndex, this.availableParts.arms.length, false)">
          &#9660;
        </button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img v-bind:src="availableParts.bases[selectedBottomIndex].imageUrl" alt="base"/>
        <button class="prev-selector"
                v-on:click="this.selectedBottomIndex=selectObj(this.selectedBottomIndex, this.availableParts.bases.length, true)">
          &#9668;
        </button>
        <button class="next-selector"
                v-on:click="this.selectedBottomIndex=selectObj(this.selectedBottomIndex, this.availableParts.bases.length, false)">
          &#9658;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
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
</style>
