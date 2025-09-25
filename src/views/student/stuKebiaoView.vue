<template>
    <div>
        <kebiao :length="10" :events="events"></kebiao>
    </div>
</template>

<script>
import kebiao from '@/components/student/kebiao.vue';
import { stuTableSearch } from '@/api/student/stu';
export default {
    components: {
        kebiao
    },
    data() {
        return {
            events: [

            ],
        }
    },
    methods: {
        gettable() {
            stuTableSearch().then((result) => {
                console.log(result);
                this.events = []
                if (result.code === 0) {
                    for (let i = 0; i < result.data.length; i++) {
                        let value = result.data[i].time.split('-', 3)
                        let shuju = {
                            xq: value[0],
                            title: result.data[i].courseName,
                            class: 'sport',
                            content: `${value[1]}-${parseInt(value[1]) + parseInt(value[2]) - 1}节` + '<br>' + result.data[i].teacherName + '<br>' + result.data[i].location,
                            start: value[1],
                            end: parseInt(value[1]) + parseInt(value[2]) - 1,
                        }
                        this.events.push(shuju)
                        console.log(this.events);

                    }
                }
            }).catch((err) => {

            });
        }
    },
    mounted() {
        this.gettable()
    }
}
</script>
<style scoped>
div {
    width: 100%;
}
</style>