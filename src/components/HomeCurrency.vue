<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Home_Exchange' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Home_Currency' | localize}}</th>
              <th>{{'Home_Course' | localize}}</th>
              <th>{{'History_Date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currensies" 
              :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(2) }}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currensies: ['UAH', 'USD', 'EUR']
  })
}
</script>
