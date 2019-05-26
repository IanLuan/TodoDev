<template>
  <div class="settings">
    <h1 class="subheading grey--text ml-4">Settings</h1>

    <v-snackbar v-model="snackbar" top color="error" flat>
      <span>{{ snackbarMessage }}</span>
      <v-btn flat color="white" @click="snackbar = false; ">Close</v-btn>
    </v-snackbar>

    <v-container>

      <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>

          <v-card-text>
          <v-form @submit.prevent="updateProfile()">

            <v-layout row justify-center>
              <v-avatar size="180" class="avatar">
                <img :src="photoURL" class="userAvatar" @click="selectFile">
              </v-avatar>
            </v-layout>

            <input type="file" ref="uploadInput" id="files" accept="image/*" :multiple="false" @change="detectFiles($event)"/>
            
            <v-text-field prepend-icon="person" label="Name" v-model="userName" color="primary"></v-text-field>
            <v-text-field prepend-icon="lock" type="password" label="New password" v-model="newPassword" color="primary"></v-text-field>
            <v-text-field prepend-icon="lock" type="password" label="Confirm new password" v-model="newPassword2" color="primary"></v-text-field>

          </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="updateProfile()" :loading="loading">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      </v-layout>

    </v-container>
    
  </div>
</template>

<script>
  import firebase from "firebase"

  export default {
    data() {
      return {
        user: "",
        userId: "",
        userName: "",
        photoURL: "",
        newPassword: "",
        newPassword2: "",
        snackbar: false,
        snackbarMessage: "",
        loading: false,
      }
    },

    methods: {

      updateProfile() {
        this.loading = true

        if (this.newPassword.length > 0 || this.newPassword2.length >0) {
          
          if (this.newPassword != this.newPassword2) {
            this.loading = false
            this.snackbarMessage = "Passwords do not match"
            this.snackbar = true;

          } else {
            this.user.updatePassword(this.newPassword).then(() => {
              
              // IF OK -> UPDATE PASSWORD AND PROFILE
              this.user.updateProfile({
                displayName: this.userName,
                photoURL: this.photoURL,

                }).then(() => {
                  this.$router.go();
                  this.snackbarMessage = "password updated successfully"
                  this.snackbar = true
                })

              }).catch((error) => {
                this.loading = false
                var errorMessage = error.message
                this.snackbarMessage = errorMessage
                this.snackbar = true
              });
          }

        } else {
          this.user.updateProfile({
          displayName: this.userName, 
          photoURL: this.photoURL,
          }).then(() => {
            this.$router.go();
          })
        }
        
      },

      selectFile () {
        this.$refs.uploadInput.click()
      },

      detectFiles (e) {
        this.loading = true
        let fileList = e.target.files || e.dataTransfer.files
        Array.from(Array(fileList.length).keys()).map(x => {
          this.upload(fileList[x])
        })
      },

      upload(file) {
        // Create a root reference
        var storageRef = firebase.storage().ref();

        // Create a reference to 'images/mountains.jpg'
        var avatarImagesRef = storageRef.child('images/'+this.userId);

        // Upload
        avatarImagesRef.put(file).then(() => {

          avatarImagesRef.getDownloadURL().then((url) => {
            this.loading = false
            this.photoURL = url
          }).catch((error) => {
            alert(error.message)
          })

        })

      },

    },

    created() {
      const user = firebase.auth().currentUser;
      if (user) {
        this.user = user
        this.userId = user.uid
        this.userName = user.displayName
        if(user.photoURL) {
          this.photoURL = user.photoURL
        } else {
          this.photoURL = "https://imgur.com/dLB4u3s.png"
        }
      } else {
        // not logged
      }

    }
  }

</script>
<style>

input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}

.avatar {
  border: 1px solid white;
  background-color: black;
}

.userAvatar {
  transition: opacity 0.2s ease-in-out;
}

.userAvatar:hover {
  opacity: 0.5;
  filter: alpha(opacity=50);
  cursor: pointer;
}

</style>

