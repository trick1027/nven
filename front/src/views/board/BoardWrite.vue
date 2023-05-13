<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnSave()"
      >
        저장
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
      <input
        type="text"
        v-model="title"
        class="w3-input w3-border"
        placeholder="제목을 입력해주세요."
      />
      <input
        type="text"
        v-model="author"
        class="w3-input w3-border"
        placeholder="작성자를 입력해주세요."
        v-if="idx === undefined"
      />
    </div>
    <div class="board-contents">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="contents"
        class="w3-input w3-border"
        style="resize: none"
      ></textarea>
    </div>
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnSave()"
      >
        저장
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
      if (this.idx !== undefined) {
        this.$http
          .get('/boards/' + this.idx, {
            params: this.requestBody
          })
          .then((_res) => {
            console.log(_res)
            this.title = _res.data.title
            this.author = _res.data.author
            this.contents = _res.data.contents
            this.create_at = _res.data.create_at
          })
          .catch((_err) => {
            console.error(_err)
          })
      }
    },
    fnList () {
      delete this.requestBody.idx
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView (idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave () {
      const apiUrl = '/boards'
      this.form = {
        idx: this.idx,
        title: this.title,
        contents: this.contents,
        author: this.author
      }
      console.log(this.form)
      if (this.idx === undefined) {
        this.$http
          .post(apiUrl, this.form)
          .then((_res) => {
            alert('글이 등록되었습니다.')
            console.log(_res.data.idx)
            this.fnView(_res.data.idx)
          })
          .catch((_err) => {
            if (_err.message.indexOf('Network Error') > -1) {
              console.error(
                '네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.'
              )
            }
          })
      } else {
        this.$http
          .put(apiUrl + '/' + this.idx, this.form)
          .then((_res) => {
            alert('글이 수정되었습니다.')
            this.fnView(_res.data.idx)
          })
          .catch((_err) => {
            if (_err.message.indexOf('Network Error') > -1) {
              console.error(
                '네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.'
              )
            }
          })
      }
    }
  }
}
</script>
