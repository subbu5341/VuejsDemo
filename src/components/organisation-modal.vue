<template>
  <!-- Org Modal Component: use this v-b-modal.org-modal to invoke modal-->
  <b-modal id="org-modal" ref="orgModal" title="Add Organization" ok-title="Save" close-title="Cancel" @cancel="clearAll" @ok="handleOk" @shown="clearAll">
    <form validated>
      <b-row class="modal-body">
        <b-col cols="4">
          <dropzone id="logoDropzone" ref="logoDropzone" class="org-logo" :use-font-awesome="true" :url="imageProps.imageUploadUrl" :maxNumber-of-files="imageProps.numberOfFiles" :resize-width="imageProps.resizeWidth" :resize-height="imageProps.resizeHeight" :show-remove-link="imageProps.showRemoveLink" v-on:vdropzone-success="uploadSuccess"
          v-on:vdropzone-error ="showError" v-on:vdropzone-removed-file= "removeFile">
          </dropzone>
        </b-col>
        <b-col cols="8">
          <b-form-input :state="nameState" class="field" type="text" ref="focusThis" placeholder="Enter organization name" v-model="name" required></b-form-input>
          <b-form-textarea :state="descriptionState" class="field" placeholder="Enter description" v-model="description" rows="6"></b-form-textarea>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
  import axios from 'axios'
  import Dropzone from 'vue2-dropzone'
  import { mapActions } from 'vuex'
  export default {
    name: 'organisationModal',
    data: function () {
      return {
        name: '',
        description: '',
        logo: '',
        nameState: null,
        descriptionState: null,
        imageProps: {
          imageUploadUrl: axios.defaults.baseURL + '/uploads',
          numberOfFiles: 1,
          showRemoveLink: true,
          resizeHeight: 140,
          resizeWidth: 140,
          errorMessage: 'unable to upload the file'
        }
      }
    },
    methods: {
      ...mapActions({
        removeLogo: 'removeLogo'
      }),
      clearAll () {
        this.name = ''
        this.description = ''
        this.logoId = ''
        this.nameState = null
        this.descriptionState = null
        this.$refs.logoDropzone.dropzone.removeAllFiles()
      },
      handleOk (e) {
        var data = {
          name: this.name,
          description: this.description,
          logoId: this.logoId ? this.logoId : ''
        }
        if ((this.name !== '') && (this.description !== '')) {
          this.$store.dispatch('addOrganisation', data)
          this.clearAll()
          return
        }
        if (this.name === '') {
          this.nameState = 'invalid'
        }
        if (this.description === '') {
          this.descriptionState = 'invalid'
        }
        e.preventDefault()
      },
      uploadSuccess (file, response) {
        this.logoId = response._id
      },
      showError (file) {
        this.$refs.logoDropzone.dropzone.defaultOptions.error(file, this.imageProps.errorMessage)
      },
      removeFile () {
        if (this.logoId !== '') {
          this.removeLogo(this.logoId)
        }
      }
    },
    components: {
      Dropzone
    },
    watch: {
      name: function () {
        this.nameState = this.name !== '' ? null : 'invalid'
      },
      description: function () {
        this.descriptionState = this.description !== '' ? null : 'invalid'
      }
    }
  }
</script>

<style>
  .modal-body {
    padding: 10px;
  }

  .modal-header {
    color: black !important;
  }

  .modal-header button.close {
    color: black !important;
    opacity: 1 !important;
  }

  .org-logo {
    width: 140px;
    border: 1px dashed #ccc;
    margin: 5px;
    font-size: small;
    color: #8d959c
  }

  .dropzone {
    padding: 0px;
  }

  .field {
    margin: 5px;
    border-radius: 0px;
  }

  .btn,
  .close {
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  .modal-footer {
    border-top: none !important;
  }

  .vue-dropzone {
    width: 140px !important;
    height: 140px !important;
  }

  .dz-image {
    width: 140px !important;
    height: 140px !important;
  }

  .dz-remove {
    margin-left: 24px !important;
    margin-right: 25px !important;
    position: relative !important;
    margin-top: -34px !important;
    padding: 0 !important;
    bottom: 19px !important;
  }

  .dz-size {
    display: none;
  }

  .dz-preview {
    margin: -1px !important;
    width: 140px !important;
    height: 140px !important;
  }

  .dropzone {
    height: 140px !important;
    min-height: 0 !important;
  }

  .dz-filename span {
    padding-left: 15px !important;
  }

  .dz-success-mark i {
    padding-left: 30px !important;
    padding-right: 30px !important;
    font-size: 10px !important;
    color: #a32626 !important;
  }

  .vue-dropzone .dz-preview .dz-error-mark i {
    font-size: 3rem!important;
  }

 .vue-dropzone .dz-preview .dz-error-mark {
    top: 28%!important;
    margin-left: 55px !important;
    margin-right: 11px !important;
    margin-top: -3px !important;
  }

  a:hover {
    text-decoration: none !important;
  }
  .dz-error-message {
    top: 85% !important;
    left: 0% !important;
  }
</style>