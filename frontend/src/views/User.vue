<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
 <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex flex-row">
          <a href="" class="text-dark">
            <i class="fas fa-user-circle fa-3x"></i>

          </a>
        </div>
        <h2 class="h5 card-title m-0">
          <a href="" class="text-dark">
                {{route.params.userName }}
          </a>
        </h2>
      </div>
      <div class="card-body">
        <div class="card-text">
          <a href="" class="text-muted">
            10 フォロー
          </a>
          <a href="" class="text-muted">
            10 フォロワー
          </a>
        </div>
      </div>
    </div>
  </div>

</template>
