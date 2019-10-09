<template>
  <div style="margin-left: 200px">
    <Layout style="width:100%;min-height:600px;">
      <LayoutPanel region="west" style="width:200px;">
        <DataList style="height:200px"
                  :data="companys"
                  selectionMode="single"
                  itemCls="dataitem"
                  @selectionChange="selectionCom($event)">
          <template slot-scope="scope">
            <div class="product" :class="{'datagrid-row-selected':isActive==scope.row.id}" >
              <p>{{scope.row.name}}</p>
            </div>
          </template>
        </DataList>
        <div style="width: 100%;height: 25px"></div>
        <Accordion class="a1" :animate="true" ref="acc" :selectedIndex="selectedIndex">
          <AccordionPanel v-for="menu in secondItem" :key="menu.id" :title="menu.name"   :aaa="menu.id" :iconCls="'fa fa-'+menu.iconCls" @click.native="selectSec($event,menu)">
            <div style="padding: 5px">
              <div class="item"  v-for="item in menu.children" :key="item.id"  :aaa="item.id" >{{item.name}}</div>
            </div>
          </AccordionPanel>
        </Accordion>
      </LayoutPanel>
      <LayoutPanel region="center" style="min-height:600px;">
        <div class="title">
          <DataGrid :data="tableData" style="height:100%">
            <GridColumn field="id" title="编号"></GridColumn>
            <GridColumn field="name" title="姓名"></GridColumn>
            <GridColumn field="email" title="email" align="right"></GridColumn>
            <GridColumn field="act" title="操作" align="center">
              <template slot="body" slot-scope="scope">
                <ButtonGroup style="height:24px">
                  <LinkButton @click="editRow(scope.row)">Edit</LinkButton>
                  <LinkButton @click="deleteRow(scope.row)">Delete</LinkButton>
                </ButtonGroup>
              </template>
            </GridColumn>
          </DataGrid>
          <Dialog ref="dlg" bodyCls="f-column" :title="title" :modal="true" closed :dialogStyle="{height:'300px'}">
            <div class="f-full" style="overflow:auto">
              <Form ref="form" :model="model" :rules="rules" @validate="errors=$event" style="padding:20px 50px">
                <div style="margin-bottom:20px">
                  <Label for="id">编号:</Label>
                  <TextBox inputId="id" name="id" v-model="model.id"></TextBox>
                  <div class="error">{{getError('id')}}</div>
                </div>
                <div style="margin-bottom:20px">
                  <Label for="name">Name:</Label>
                  <TextBox inputId="name" name="name" v-model="model.name"></TextBox>
                  <div class="error">{{getError('name')}}</div>
                </div>
                <div style="margin-bottom:20px">
                  <Label for="email">email:</Label>
                  <TextBox inputId="email" name="email" :precision="1" v-model="model.email"></TextBox>
                </div>
              </Form>
            </div>
            <div class="buttons f-noshrink">
              <LinkButton @click="saveRow()">Save</LinkButton>
              <LinkButton @click="$refs.dlg.close()">Cancel</LinkButton>
            </div>
          </Dialog>
        </div>
      </LayoutPanel>
    </Layout>
  </div>
</template>

<style scoped>
  @import "./home.css";
</style>

<script>
  import home from './home'
  export default home
</script>
