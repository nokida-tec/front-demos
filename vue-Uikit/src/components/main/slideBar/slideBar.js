

export default {
  data(){
    return {
      msg: '侧边栏',
      data: [{
        label: '704所-永丰实验室',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          },
            {
              label: '三级 1-1-2'
            },
            {
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },
            {
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            },{
              label: '三级 1-1-1'
            },
            {
              label: '三级 1-1-2'
            }]
        },
          {
            label: '二级 1-2',
            children: [{
              label: '三级 1-2-1'
            },
              {
                label: '三级 1-2-2'
              }]
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created(){

  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
