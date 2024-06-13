<template>
    <div class="comment">
        <p class="comment-sender">{{ senderName }} :</p>
        <p class="comment-text">{{ commentText }}</p>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        senderName: {
            type: String,
            required: true
        },
        commentText: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.comment {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.comment-sender {
    margin: 0;
    font-weight: bold;
}
.comment-text {
    margin: 0;
}
</style>
