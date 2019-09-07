<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Register_CRM' | localize}}</span>
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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid:  $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{'Name' | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{'Register_Enter' | localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{'Register_Agree' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'Login_Sign' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Register_Account' | localize}}
        <router-link to="/login">{{'Login_Come' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
     return {
       title: this.$title('Register_Register')
     }
   },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(7)},
    name: {required},
    agree: {checked: v => v}
  },
   methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return 
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(error) {}
    }
  }
}
</script>
