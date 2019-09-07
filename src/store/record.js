import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
     try {
      const uid = await dispatch('getUid')
      return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        
        //Через метод forEach
        /*const cats = []
        Object.keys(records).forEach(key => {
          cats.push({
            title: records[key].title,
            limit: records[key].limit,
            id: key
          })
        })
        return cats*/

        //Через метод map
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (error) {
        commit('setError' , error)
        throw error
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return {...record, id}
      } catch (error) {
        commit('setError' , error)
        throw error
      }
    }
  }
}
