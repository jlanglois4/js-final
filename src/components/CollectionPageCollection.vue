<!--suppress ES6MissingAwait -->
<template>
  <div>
    <h1>The Collective Collection</h1>
    <p>This page lists everyone's entries.</p>
    <p v-if="items.length === 0">No items found</p>
    <v-row>
      <v-col md="4" v-for="item in items" :key="item.id">
        <v-card>
          <v-img v-if="item.image"
                 height="250"
                 :src="item.image"
                 lazy-src="https://via.placeholder.com/250">
          </v-img>
          <v-card-title> {{ item.title }}</v-card-title>
          <v-card-text>
            <p class="body-1">Category: {{ item.category }}</p>
            <p class="body-1">Price: ${{ item.price }}</p>
            <p>{{ item.description }}</p>
            <p> Posted By: {{item.author}}</p>
<!--            <p> email {{item.authorEmail}}</p>-->

            <v-btn block color="primary" :href="'mailto:'+ item.authorEmail">Interested? Email user.</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {auth, itemsCollection, storage, usersCollection} from "../firebase"

export default {
  name: 'HomePageCollection',

  data() {
    return {
      items: [],
    }
  },

  methods: {
    async getItems() {
      try {
        const querySnapshot = await itemsCollection.get()

        querySnapshot.forEach(async (doc) => {
          let img = ''
          if (doc.data().image) {
            img = await storage.ref().child(doc.data().image).getDownloadURL()
          }

          let authorQuery = await usersCollection.doc(doc.data().userId).get()

            this.items.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              price: doc.data().price,
              category: doc.data().category,
              image: img,
              img: doc.data().image,
              author: authorQuery.data().name,
              authorEmail: authorQuery.data().email
            })

        })
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