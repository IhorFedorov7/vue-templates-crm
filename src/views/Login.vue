<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Login_Home' | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
         class="helper-text invalid"
         v-if="$v.email.$dirty && !$v.email.required"
         >{{'Login_EmailNot' | localize}}</small>
         <small
         class="helper-text invalid"
         v-else-if="$v.email.$dirty && !$v.email.email"
         >{{'Login_Email' | localize}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Login_Password' | localize}}</label>
        <small
         class="helper-text invalid"
         v-if="$v.password.$dirty && !$v.password.required"
         >{{'Login_Enter' | localize}}</small>
         <small
         class="helper-text invalid"
         v-if="$v.password.$dirty && !$v.password.minLength"
         >{{'Login_PasswordMust' | localize}} {{$v.password.$params.minLength.min}} {{'Login_Symbolize' | localize}} {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >{{'Login_Come' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Login_account' | localize}}
        <router-link to="/register">{{'Login_Sign' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import locaizeFilter from '@/filters/localize.filter'

export default {
  name: 'login', 
  metaInfo() {
     return {
       title: this.$title('Login_Login')
     }
   },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(7)},
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(locaizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return 
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
      this.$router.push('/')
      } catch (error) {} 
    }
  }
}
</script>
