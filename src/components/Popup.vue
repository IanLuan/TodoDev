<template>
    
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>

          <!-- Date Picker -->
          <v-menu>
            <v-text-field :rules="dateRules" readonly :value="formattedDate" slot="activator" label="Due date" prepend-icon="date_range"></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
        </v-form>
      </v-card-text>

    </v-card>
  </v-dialog>

</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'
import firebase from 'firebase'
import { EventBus } from '@/event-bus.js';

export default {

  data() {
    return {
      dialog: false,
      title: '',
      content: '',
      due: null,
      userId: '',
      inputRules: [
        v =>(v && v.length >= 3) || 'Minimum length is 3 characters'
      ],
      dateRules: [
        v =>(v && v.length >= 4) || 'Invalid format. Click to pick'
      ],
      loading: false,
    }
  },
  methods: {
    
    submit() {

      if(this.title.length > 0 && this.due.length >= 4) {
        this.loading = true;
        const collectionRef = db.collection('users/'+this.userId+'/projects');
        
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.due, 'Do MMM YYYY'),
          status: 'ongoing',
          priority: 100
        }

        collectionRef.add(project).then(() => {
          this.loading = false;
          this.dialog = false;
          EventBus.$emit('project-added');
        });

        this.save()
        this.$refs.form.reset()

        
      }

    },

  },
  computed: {
    formattedDate() {
      return this.due ? format(this.due, 'Do MMM YYYY') : ''
    }
  },

  created() {
    const user = firebase.auth().currentUser;

    if (user){
      var userId = user.uid;
    } else {
      //
    }
    this.userId = userId;


  }


}
</script>
