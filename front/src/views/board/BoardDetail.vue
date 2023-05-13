<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnUpdate()"
      >
        수정
      </button>
      <button
        type="button"
        class="w3-button w3-round w3-red"
        @click="fnDelete()"
      >
        삭제
      </button>
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        @click="fnList()"
      >
        목록
      </button>
    </div>
    <div class="board-contents">
      <h3>{{ title }}</h3>
      <div>
        <strong class="w3-large">{{ author }}</strong>
        <br />
        <span>{{ create_at }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ contents }}</span>
    </div>
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnUpdate()"
      >
        수정
      </button>
      <button
        type="button"
        class="w3-button w3-round w3-red"
        @click="fnDelete()"
      >
        삭제
      </button>
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        @click="fnList()"
      >
        목록
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,
      title: '',
      author: '',
      contents: '',
      create_at: ''
    }
  },
  mounted () {
    this.fnGetView()
  },
  methods: {
    fnGetView () {
      this.$http
        .get('/boards/' + this.idx, {
          // params: this.requestBody
        })
        .then((_res) => {
          this.title = _res.data.title
          this.author = _res.data.author
          this.contents = _res.data.contents
          this.create_at = _res.data.create_at
        })
        .catch((_err) => {
          if (_err.message.indexOf('Network Error') > -1) {
            console.error(
              '네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.'
            )
          }
        })
    },
    fnList () {
      delete this.requestBody.idx
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnUpdate () {
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    fnDelete () {
      if (!confirm('삭제하시겠습니까?')) return false
      this.$http
        .delete('/boards/' + this.idx, {})
        .then(() => {
          alert('삭제되었습니다')
          this.fnList()
        })
        .catch((_err) => {
          console.error(_err)
        })
    }
  }
}
</script>
