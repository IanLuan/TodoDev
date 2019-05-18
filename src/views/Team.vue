<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-4">
      
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="150">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>

            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    
  </div>
</template>

<script>

  export default {
    data() {
      return {
        team: [
          { name: 'Ian Luan', role: 'Fullstack developer', avatar: '/man.png' },
          { name: 'Maya', role: 'Mobile developer', avatar: '/girl.png' },
          { name: 'Eufranio', role: 'Desktop developer', avatar: '/eufranio.png' },
          { name: 'Yasmim', role: 'Web Designer', avatar: '/yasmim.png' },
          { name: 'Matheus', role: 'Web Designer', avatar: '/matheus.png' },
        ]
      }
    }
  }

</script>
