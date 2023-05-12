<script setup>

defineProps({
  initialIsLikedBy:{
    type:Boolean,
    default:false
  }
})

</script>
  <template>
  <div>
    <button
      type="button"
      class="btn m-0 p-1 shadow-none"
    >
      <i class="fas fa-heart mr-1"
      :class="{'red-text':initialIsLikedBy}"
      />
    </button>
    10
  </div>
</template>
