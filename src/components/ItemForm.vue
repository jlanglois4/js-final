<template>
  <div class="item-form">
    <v-btn @click="dialog = !dialog" color="primary" v-if="!item">Add new item</v-btn>
    <v-btn @click="dialog = !dialog; setData()" color="primary" v-else>Edit item</v-btn>

    <v-dialog v-model="dialog" persistent width="600px">
      <v-card>
        <v-card-title v-if="!item">
          Add new item
        </v-card-title>
        <v-card-title v-else>
          Edit item
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid"
                  lazy-validation
                  ref="form">
            <v-text-field v-model="title"
                          :rules="fieldRules"
                          label="Item title"
                          required
                          outline>
            </v-text-field>
            <v-text-field v-model="description"
                          :rules="fieldRules"
                          label="Item description"
                          required
                          outline>
            </v-text-field>
            <v-text-field v-model="price"
                          :rules="fieldRules"
                          label="Item price"
                          required
                          outline>
            </v-text-field>
            <v-text-field v-model="category"
                          :rules="fieldRules"
                          label="Item category"
                          required
                          outline>
            </v-text-field>
            <!--            <v-text-field v-model="url"-->
            <!--                          :rules="fieldRules"-->
            <!--                          label="Item url"-->
            <!--                          required-->
            <!--                          outline>-->
            <!--            </v-text-field>-->
            <v-file-input accept="image/*"
                          label="File input"
                          v-model="file"
                          show-size>
            </v-file-input>
            <p>Current image: <a v-if="oldImage" :href="oldImage">link</a></p>

            <v-btn elevation="2"
                   color="primary"
                   @click="storeItem"
                   :loading="isLoading"
                    v-if="!item">
              Add Item
            </v-btn>

            <v-btn elevation="2"
                   color="primary"
                   @click="updateItem"
                   :loading="isLoading"
                    v-else>
              Update
            </v-btn>

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"
                 text
                 @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {itemsCollection, auth, storage} from '../firebase'

export default {
  name: "ItemForm",
  props: ['item', 'index'],
  data() {
    return {
      isLoading: false,
      valid: false,
      dialog: false,
      title: '',
      description: '',
      price: 0,
      category: '',
      file: null,
      fieldRules: [
        v => !!v || 'this field is required'
      ],
      oldImage: ''
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.reset()
    },

    async storeItem() {
      try {
        this.isLoading = false
        this.dialog = false

        // upload image
        const fileRef = 'uploads/items/' + this.file.name
        const snapshot = await storage.ref(fileRef).put(this.file)

        let data = {
          userId: auth.currentUser.uid,
          title: this.title,
          description: this.description,
          price: this.price,
          category: this.category,
          image: fileRef,
        }

        const doc = await itemsCollection.add(data)

        this.$emit('item:added', data)

        await this.resetForm()
        this.isLoading = false
        this.dialog = false

      } catch (e) {
          console.log(e)
      }
    },
    async updateItem() {
      try {
        this.isLoading = false
        this.dialog = false

        let data = {
          userId: auth.currentUser.uid,
          title: this.title,
          description: this.description,
          price: this.price,
          category: this.category,
        }

        if(this.file) {
          // delete the old image
          const fileRefOld = this.item.img
          await storage.ref(fileRefOld).delete()

          // upload image
          const fileRef = 'uploads/items/' + this.file.name
          const snapshot = await storage.ref(fileRef).put(this.file)

          data.image = fileRef

        } else {
          data.image = this.item.img
        }

        const doc = await itemsCollection.doc(this.item.id).update(data)

        await this.resetForm()
        this.isLoading = false
        this.dialog = false
        data.index = this.index
        this.$emit('item:updated', data)
        alert('Item updated!')
      } catch (e) {
        console.log(e)
      }
    },

    setData() {
      if(this.item) {
        this.title = this.item.title
        this.description = this.item.description
        this.price = this.item.price
        this.category = this.item.category
        this.oldImage = this.item.image
      }
    }
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>

</style>