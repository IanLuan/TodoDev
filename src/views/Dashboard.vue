<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    
    <v-container class="my-4">

      <v-layout row class="mb-3">

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
          <span>Sort projetcs by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By person</span>
          </v-btn>
          <span>Sort projects by person</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('status')" slot="activator">
            <v-icon left small>check_circle</v-icon>
            <span class="caption text-lowercase">By status</span>
          </v-btn>
           <span>Sort projects by status</span>
        </v-tooltip>

      </v-layout>
      
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">

          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div><v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip></div>
          </v-flex>

        </v-layout>
        <v-divider></v-divider>
      </v-card>
      
    </v-container>


  </div>
</template>

<script>
  import db from '@/fb'

  export default {
    data() {
      return {
        projects: []
      }
    },

    methods: {
      sortBy(prop){
        this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      }
    },
    created() {
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added') {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    }
  }

</script>

<style>

  .project.complete {
    border-left: 4px solid #3cd1c2;
  }

  .project.ongoing {
    border-left: 4px solid #ffaa2c;
  }

  .project.overdue {
    border-left: 4px solid #f83e70;
  }

  .v-chip.complete {
    background-color: #3cd1c2;
  }

  .v-chip.ongoing {
    background-color: #ffaa2c;
  }

  .v-chip.overdue {
    background-color: #f83e70;
  }

</style>
