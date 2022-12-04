<!--suppress ES6MissingAwait -->
<template>
  <div class="dashboard">
    <h1>Hi, {{ userProfile.name }}</h1>
    <ItemForm @item:added="addItem"></ItemForm>
      <v-col md="4" v-for="(item, index) in items" :key="item.id">
        <v-card>
          <v-img
            v-if="item.image"
            height="250"
            :src="item.image"
            lazy-src="https://via.placeholder.com/250"
            >
          </v-img>
          <v-card-title>{{item.title}}</v-card-title>
          <v-card-text>
            <p class="subtitle-1">Category: {{ item.category }}</p>
            <p class="subtitle-1">Price: ${{ item.price }}</p>
            <p>{{ item.description }}</p>
          </v-card-text>
          <v-card-actions>
            <ItemForm :item="item" :index="index" @item:updated="updateItem"/>
            <v-btn color="red" @click="deleteConfirm(item.id, item.title)" text>Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    <v-dialog v-model="deleteDialog"
              max-width="400">
      <v-card>
        <v-card-title class="headline">
          Delete Game?
        </v-card-title>
        <v-card-text> Are you sure you want to delete
          <b>{{pTitle}}</b>?
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" @click="deleteItem">Delete</v-btn>
          <v-btn @click="deleteDialog = false" text color="secondary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ItemForm from '@/components/ItemForm'
import { auth, storage, itemsCollection } from '../firebase'
export default {
  components: {
    ItemForm
  },

  data() {
    return {
      items: [],
      pId: null,
      pTitle: null,
      deleteDialog: false,
    }
  },

  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    async addItem(doc){
      let img = ''
      if (doc.image) {
        img = await storage.ref().child(doc.image).getDownloadURL()
      }
      this.items.push({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        image: img,
        img: doc.image
      })
    },
     async updateItem(doc) {
      let img = ''
      if (doc.image) {
        img = await storage.ref().child(doc.image).getDownloadURL()
      }
      this.items.splice(doc.index, 1, {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        image: img,
        img: doc.image
      })
    },
    async getItems() {
      try {
        const querySnapshot = await itemsCollection.where('userId', '==', auth.currentUser.uid).get()

        querySnapshot.forEach( async (doc) => {
          let img = ''
          if (doc.data().image) {
            img = await storage.ref().child(doc.data().image).getDownloadURL()
          }
          this.items.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            price: doc.data().price,
            category: doc.data().category,
            image: img,
            img: doc.data().image
          })
        })
      } catch (e){
        console.log(e)
      }
    },

    async deleteConfirm(id, title) {
      this.deleteDialog = true
      this.pId = id
      this.pTitle = title
    },

    async deleteItem() {
      try {
        await itemsCollection.doc(this.pId).delete()
        alert('Game deleted!')
        this.pId = null
        this.pTitle = null
        // remove from array
        this.items.splice(this.items.findIndex(x => x.id == this.pId))
        this.deleteDialog = false
        //reset

        this.pId = null
        this.pTitle = null

      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    await this.getItems()
  }
}
</script>

<style scoped>

</style>