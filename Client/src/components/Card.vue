<template>
    <div class="card">
        <div class="create-post-input">
            <img src="./img/user-1.png" />
            <div class="user-info">
                <p class="username">{{ profile.username }}</p>
                <p class="role">{{ profile.job }}</p>
            </div>
        </div>
        <div class="main-card">
            <!-- <h8 class="title">{{ profile.title }}</h8> -->
            <p class="content">{{ profile.content }}</p>
        </div>
        <div class="bottom-card">
            <font-awesome-icon :icon="['fas', 'comments']" class="icon" />
            <textarea rows="1" class="card-text" placeholder="Comments"></textarea>
            <button class="send-button">Send</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        profile: {
            type: Object,
            required: true
        }
    }
};
</script>


<style>
.card {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
}

.create-post-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
}

.create-post-input img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 14px;
}

.role {
    margin-bottom: 0;
    font-size: 10px;
    color: #888;
}

.main-card {
    /* padding: 5px; */
    border-bottom: 1px solid #eee;
}

.title {
    font-weight: bolder;
    margin-bottom: 10px;
    font-size: 16px;
}

.content {
    font-size: 13px;
    margin-bottom: 0;
}

.bottom-card {
    display: flex;
    align-items: center;
    padding: 10px;
}

.icon {
    margin-left: 5px;
    color: #555;
}

.card-text {
    flex: 1;
    margin-left: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    resize: vertical;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
}

.card-text:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

.send-button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.send-button:hover {
    background-color: #0056b3;
}

.send-button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
