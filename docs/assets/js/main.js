"use strict";const searchInput=document.querySelector(".js_search_input"),searchBtn=document.querySelector(".js_search_btn"),listCharactersElement=document.querySelector(".js_list_characters"),sectionFavoritesElement=document.querySelector(".js_section_favorites"),listFavoritesElement=document.querySelector(".js_list_favorites"),favMessage=document.querySelector(".js_fav_message"),btnGoFav=document.querySelector(".js_button_gofav"),btnResetFav=document.querySelector(".js_reset_favorites");let allCharacters=getFromLocal("allCharactersLS"),foundCharacters=allCharacters,favCharacters=getFromLocal("favCharactersLS");const classListItemAllCharacters="js_character_article",classListItemFavCharacters="js_favorite_article",classRemoveIcon="js_remove_favorite";if(favCharacters&&favCharacters.length>0){sectionFavoritesElement.classList.remove("hidden"),btnGoFav.classList.remove("hidden");renderCharacters(favCharacters,listFavoritesElement,"js_favorite_article",!0)}else favCharacters=[],sectionFavoritesElement.classList.add("hidden"),btnGoFav.classList.add("hidden");function fetchCharacters(){fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{allCharacters=e,foundCharacters=allCharacters,saveToLocal(allCharacters,"allCharactersLS"),renderCharacters(allCharacters,listCharactersElement,"js_character_article")})}function fetchSearchCharacters(e){fetch("https://breakingbadapi.com/api/characters?name="+e).then(e=>e.json()).then(e=>{foundCharacters=e,renderCharacters(foundCharacters,listCharactersElement,"js_character_article")})}function createBaseArticle(e,a){const t=document.createElement("article"),r=document.createElement("h3"),s=document.createElement("img"),c=document.createElement("p"),n=document.createTextNode(e.name),i=document.createTextNode(e.status);r.appendChild(n),s.src=e.img,s.alt="Photo of "+e.name,c.appendChild(i),r.classList.add("item__article__title"),s.classList.add("item__article__img"),c.classList.add("item__article__text"),t.classList.add("item__article"),t.classList.add(a);return-1!==favCharacters.findIndex(a=>a.char_id===e.char_id)&&t.classList.add("favorite"),t.setAttribute("id",e.char_id),t.appendChild(r),t.appendChild(s),t.appendChild(c),t}function renderOneCharacter(e,a,t){let r={};const s=document.createElement("li");return r=t?createFavArticle(e,a):createBaseArticle(e,a),s.classList.add("item"),s.appendChild(r),s}function renderCharacters(e,a,t,r=!1){a.innerHTML="";for(const s of e)a.appendChild(renderOneCharacter(s,t,r));addCharacterListeners(),addFavoriteListeners()}function createFavArticle(e,a){const t=createBaseArticle(e,a),r=document.createElement("div"),s=document.createElement("i");return r.classList.add("item__article__remove"),r.classList.add(classRemoveIcon),s.classList.add("fa-solid"),s.classList.add("fa-circle-xmark"),s.classList.add("item__article__remove__icon"),r.appendChild(s),t.insertBefore(r,t.firstChild),t}function handleSearchClick(e){e.preventDefault();const a=searchInput.value.toLowerCase();allCharacters?(foundCharacters=allCharacters.filter(e=>e.name.toLowerCase().includes(a)),renderCharacters(foundCharacters,listCharactersElement,"js_character_article")):fetchSearchCharacters(a)}function handleInput(e){e.preventDefault();searchInput.value||handleSearchClick(e)}function addCharacterListeners(){const e=document.querySelectorAll(".js_character_article");for(const a of e)a.addEventListener("click",handleCharactersClick)}function handleCharactersClick(e){const a=e.currentTarget,t=parseInt(a.id),r=allCharacters.find(e=>e.char_id===t);if(isCharacterInFavorites(t)){const e=getFavIndex(t);favCharacters.splice(e,1),removeFavoriteClass(a)}else favCharacters.push(r),addFavoriteClass(a),showFavMsg(),setTimeout(hideFavMsg,3e3);if(saveToLocal(favCharacters,"favCharactersLS"),favCharacters.length>0){showFavorites();renderCharacters(favCharacters,listFavoritesElement,"js_favorite_article",!0)}else hideFavorites()}function addFavoriteListeners(){const e=document.querySelectorAll(".js_remove_favorite");for(const a of e)a.addEventListener("click",handleFavoritesClick)}function handleFavoritesClick(e){const a=e.currentTarget.parentElement,t=parseInt(a.id),r=allCharacters.find(e=>e.char_id===t);if(isCharacterInFavorites(t)){const e=getFavIndex(t);favCharacters.splice(e,1),removeFavoriteClass(a)}else favCharacters.push(r),addFavoriteClass(a);if(saveToLocal(favCharacters,"favCharactersLS"),favCharacters.length>0){showFavorites();renderCharacters(favCharacters,listFavoritesElement,"js_favorite_article",!0)}else hideFavorites();renderCharacters(allCharacters,listCharactersElement,"js_character_article")}function handleResetClick(){favCharacters=[],removeFromLocal("favCharactersLS");renderCharacters(favCharacters,listFavoritesElement,"js_favorite_article",!0),renderCharacters(foundCharacters,listCharactersElement,"js_character_article"),hideFavorites()}function hideFavMsg(){favMessage.classList.add("hidden")}function showFavMsg(){favMessage.classList.remove("hidden")}function getFavIndex(e){return favCharacters.findIndex(a=>a.char_id===e)}function isCharacterInFavorites(e){let a=!1;return-1!==getFavIndex(e)&&(a=!0),a}function hideFavoritesSection(){sectionFavoritesElement.classList.add("hidden")}function hideButtonGoFav(){btnGoFav.classList.add("hidden")}function hideFavorites(){hideFavoritesSection(),hideButtonGoFav()}function showFavoritesSection(){sectionFavoritesElement.classList.remove("hidden")}function showButtonGoFav(){btnGoFav.classList.remove("hidden")}function showFavorites(){showFavoritesSection(),showButtonGoFav()}function addFavoriteClass(e){e.classList.add("favorite")}function removeFavoriteClass(e){e.classList.remove("favorite")}function getFromLocal(e){return JSON.parse(localStorage.getItem(e))}function saveToLocal(e,a){localStorage.setItem(a,JSON.stringify(e))}function removeFromLocal(e){localStorage.removeItem(e)}allCharacters?renderCharacters(allCharacters,listCharactersElement,"js_character_article"):fetchCharacters(),searchInput.value="",searchBtn.addEventListener("click",handleSearchClick),searchInput.addEventListener("input",handleInput),btnResetFav.addEventListener("click",handleResetClick);