<template>
  <!--  col  格式     xs  sm  md   lg   xl   -->
  <div>
    <b-row>
      <b-col sm="2" lg="3">
        <b-list-group >
          <b-list-group-item v-for="com in deviceLists"  :key="com.id" class="com-list" :class="{ active: activeMr==com.id }" @click="selectCom(com)">{{com.name}}</b-list-group-item>
        </b-list-group>
        <div style="width: 100%;height: 30px"></div>
        <div role="tablist">
          <b-card no-body class="mb-1" v-for="(zu,index) in conList"  :key="zu.id" >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block  v-b-toggle="'id_'+index" variant="info">{{zu.name}}   </b-button>
            </b-card-header>
            <b-collapse :id="'id_'+index" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-list-group-item v-for="x in zu.chidren"  :key="x.id" >{{x.name}}</b-list-group-item>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
      <b-col sm="10" lg="9">
        <div>
         <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button>-->

          <b-modal id="modal-1" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
          </b-modal>
        </div>
        <b-container fluid>
          <!-- Main table element -->
          <b-table
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
          >
            <template v-slot:cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template v-slot:cell(actions)="row">
              <b-button size="sm" @click="viewinfo(row.item, row.index, $event.target)" class="mr-1">
                删除
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                查看
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </b-col>
    </b-row>

  </div>
</template>

<style scoped>
  @import "./home.css";
</style>

<script>
  import home from './home'
  export default home
</script>
