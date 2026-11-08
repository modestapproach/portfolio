<!-- source: https://donji.webflow.io/projects/kickback-overview | title: Kickback Overview -->

![Banner Link Arrow](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/626ed9ada82a8505fd6ab82c_banner-title-arrow.svg)

Back To Home → /

# Kickback - A 2D Metaverse

Use Swiper JS and WeBlocks

# Carousel Slider CMS

## Heading

This is some text inside of a div block.

![Case Study Banner](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/647a755750ca2adb1ee58f48_Screen%20Shot%202023-06-02%20at%204.03.41%20PM.png)

## What is Kickback?

Kickback is a 2D metaverse app. You can simply move around and talk to others in a way that feels less confined than a zoom meeting.

During the quarantine of 2021, I found myself having a lot more time than normal, so I went about trying to solve what I saw as one of the most annoying problems at the time, zoom meetings. I entered a hackathon with this idea, and ended up getting 1st place. After, I founded a startup and we brought this idea to life.

## Back to the living room Hackathon - Grand Prize Winner

A bit into the quarantine, I found this hackathon with $10,000 in prizes, and thought the idea I was working on was a perfect fit, so I put together a team, and after several days of sleepless nights and non-stop work, we submitted the following video which won us the competition:

[video: https://www.youtube.com/watch?v=ZISNQThuj_c]

# Problem

![Problem Icon](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/630edd26741decb0c77a4976_cross-mark-apple.png)

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6558027fcada8fea434e7b90_Screen%20Shot%202023-11-17%20at%203.04.31%20PM.png)

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6558037452d366d42666eb1f_Kickback.chat.png)

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/630edd26741decb0c77a4976_cross-mark-apple.png)

Hosting group events on zoom is lacking the group dynamic necessary for clusters of side conversations.

# Solution

![Problem Icon](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/626ed9ada82a85d20a6ab8e5_solution-tick.png)

Create a way for users to freely move in and out of conversations.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/626ed9ada82a8577b66ab8a3_solution-tick-icon.svg)

Allow for a mental model of communication that maps to how we are used to conducting ourselves in a real world party or event.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/626ed9ada82a8577b66ab8a3_solution-tick-icon.svg)

Allow for mods to create fun events, and giving them tools to control the user experience.

## How does it work?

I came up with the UI of kickback by building around two main core concepts

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6441e372d09d4c50c4c1191f_Screen%20Recording%202021-02-23%20at%209.28.04%20AM.2021-02-23%2009_30_40.gif)

### If you are touching someone else's bubble you can hear them talk.

This interaction mimics how people talk in real life. It is basically a birds eye view of the real world.

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6483b418d834eb18f5dc7c3f_diagram.png)

### If Person A is touching B, and B is touching C, A and C can hear each other.

This allows people to create groups of conversation on the fly, without managing who is in a room and who is not.

## Initial Research

Before I came up with with any more thought out designs, all of this begin with one initial hypothesis, that smaller video has big advantages over large format video.

### Pitch Deck

[embed: https://docs.google.com/presentation/d/e/2PACX-1vQH36lbr3mCWGSMNqi-ZbmO0ZyjsdBSRnnfD-SAaItk_a5-8BbCmYF4L2blviUUySoaWEJM9FBzJ1AE/embed?start=false&loop=false&delayms=3000&rm=embedded]

### Project Summary

After raising a bit of money, we were off to the races to build out our product. We needed to simultaneously build and test. As you might notice, the product is no longer in existence. One thing that we learned was picking the right tech stack early on is important. We started off using the DOM to render all animations, and had the entire web app built out after 3 months. When we got our first customer, our demo failed during the first test run. That's when we realized that solution wasn't scalable to large groups, we then decided to remake the entire app using HTML canvas, which renders using the gpu instead of the cpu. We were pretty close to finishing that one, but ran out of funding and had to find other work. Over the course of this project, I learned a great deal about what it takes to bring a web app to market from scratch.

Illustration & Brand

UX/UI

Website

### Project Details

### Role :

Designer, Founder

### Duration :

May 2021 - December 2022

### Tools :

Figma, Webflow, Design Thinking Workshops

## Figma Prototypes - Map Navigation

Based off of user testing, I found that there were some issues navigating a large area when your field of view is so small. These are solutions to solve this problem.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/656e869b439ee7cb13ddd4f1_wayfinders.gif)

# Wayfinders

Wayfinders help you find your friends easily on a large canvas. If friends are outside of the screen, you can click on the wayfinders to quickly jump next to them.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/656e763631d56e6a6cef7ba7_go%20to%20friend.gif)

# Share location

You can also message friends with your location. You can either click on the pop up message notification to go to location, or you can go to go into your inbox.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/65711085a3d180442439b7b4_view%20map.gif)

# View map

This feature lets users get a birds eye view of the room.

## Figma Prototype - Communication UI

The next features I focused on were around enhancing the way users communicated on the platform.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/656e83ee31d56e6a6cf8f7fb_broadcast.gif)

# Shout to room

With this feature, users can shout to the entire room so others can hear them even if they aren't touching bubbles. You can even start shouting while in map view.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/656e898ffaca3b4a45283fa2_big%20view.gif)

# Zoom in Conversation

This feature let you zoom in the view like it is in zoom.

## Figma Prototype - Workshops

In order to host virtual workshops, I found that it was important to empower the host of the workshop with various tools to organize the participants.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/656e83ee31d56e6a6cf8f7fb_broadcast.gif)

# Zones

Users can upload image of zones to put on the floor and run workshops like on the youtube show jubilee.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/657116c338ba240a51f0d92e_Screen%20Shot%202023-12-06%20at%204.47.54%20PM.png)

https://youtu.be/BpRKCvWxiJw → https://youtu.be/BpRKCvWxiJw

In jubilee videos, there are words written on the floor and the host asks a question, and the users stand on their answer. Often there are different things written on the floor depending on the video's subject.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/657117bdc2b3ccf639872c3e_Screen%20Shot%202023-12-06%20at%204.54.03%20PM.png)

https://youtu.be/SjFeW_y7NYk → https://youtu.be/SjFeW_y7NYk

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/657233ad0795665f88e318d4_slides.gif)

# Slides

Unlike real life, where changing the floor would take time, moderators of the rooms can change the zones on the floor by using the slides feature. Each slide can also have a question posed at the top. This lets hosts lead a group through a number of pre planned out activities.

## Figma Prototype 4

If you watched the video, there were quite a bit of features, as we moved forward with the project, we started to narrow down the scope, as well as changed the color-scheme. This contained the features we needed for our MVP.

## Research

Part of my research was looking at every possible competitor to see which niche areas I could plan to take over. I did an extensive analysis of which platforms contain which features.

[embed: https://docs.google.com/spreadsheets/d/e/2PACX-1vRLDFWFjQpAqayiCUmUHWZ7XIz_3HcHpPWBy-8C9Ms3EcQPDBhs3uiqugB6qweU7HqJdYmS6Ff4r4Pe/pubhtml?gid=0&single=true&widget=true&headers=false]

## UI - Map Exploration

For creating a UI where your character can move around and talk to others on a 2d canvas, there are two main ways you can handle the navigation of your character within the 2d space. Here are 2 main interactions I found:

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6573a3c124105e611d1d7c9a_zelda.gif)

### User moves freely within fixed space

In games like zelda, your character is not fixed and can move to the edges of the screen. Pros: - Assuming you don't have multiple rooms/tiles and just have one giant room, if there are other users, you can see everyone in the space you are in. ‍ Cons: - you have a limited space. - The space is limited by the screen size you are on. Bigger screens can show more space. This means if you change the aspect ratio of the screen, you will have dead space.

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6573a4a424105e611d1de550_pokemon.gif)

### User fixed in center, unlimited space

In games like pokémon, the user is fixed in the center, and this lets you explore in an infinite canvas. Pros: - You can have an infinite space to move around in. - Your screen size and aspect ratio are flexible because all it does in just narrows the field of view, but you can still navigate all the same. ‍ Cons: - You don't know who is off screen, without way finders or some sort of map showing locations of people.

## UI - Movement Exploration

Things become a bit more complicated when designing for this type of app when you take into consideration how you move, depending on what type of device you are using. On the examples above, it is simple because the gameboy has the direction pad. But in our modern day, we have desktop, tablet, mobile, and vr. Each has different input methods.

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/64838e9ef568f074f9238598_zelda.jpeg)

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6483a13068ece656c7bbcd77_movement%20explanation.png)

Let's consider this Zelda movement style in the context of mobile, how does one move around? If you swipe do they move one tile? Imagine how many swipes it would take to get to the other side of the map. You could have a virtual joystick, but that takes up space, and then the area of the screen that virtual joystick takes up space. What if you have a swipe? that could be interesting, but in practice, it isn't that intuitive if the user is not fixed in the center of the screen.

![Research Image](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/64838dd979d2c1e4fe2694ad_pokemon.webp)

I opted for this movement style where the user is fixed in the center, because on desktop you could move via asdf, or arrow keys, or dragging the background while your character remains in the center (you can experience this by testing the Figma prototype. On mobile, you can move by dragging the background, while you are fixed in the center. The advantage of this is you can move quickly and are not limited by the speed set by arrow keys. If you have a phone and you use the figma prototype, you can test this movement out.

Process For Turning User Feedback Into A Feature Roadmap In

Miro → https://miro.com/app/board/o9J_kmMq_Lk=/

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645611438d115b1223600a25_Screen%20Shot%202023-05-06%20at%201.34.50%20AM.png)

#### Step 1: Post product on reddit and get feedback

The first step I posted a video of myself going over a screen recording of my figma design. Both of these posts received quite a bit of engagement, but these are only 2 of the successful ones out of the 10 other posts I made. Posting on reddit to get feedback is a numbers game.

I created this networking app. What do you think? → https://www.reddit.com/r/web_design/comments/jktgo2/i_created_this_networking_app_what_do_you_think/

by

u/DonjiDonji → https://www.reddit.com/user/DonjiDonji

in

web_design → https://www.reddit.com/r/web_design/

I created this product for virtual networking, hopefully it’s cool enough for you to let my rule breaking slide :) → https://www.reddit.com/r/NewProductPorn/comments/jftt5j/i_created_this_product_for_virtual_networking/

by

u/DonjiDonji → https://www.reddit.com/user/DonjiDonji

in

web_design → https://www.reddit.com/r/web_design/

I received about 200 comments from these posts, here are two examples:

Comment → https://www.reddit.com/r/web_design/comments/jktgo2/i_created_this_networking_app_what_do_you_think/galefdk/

by

u/jeffhowcodes → https://www.reddit.com/user/jeffhowcodes

from discussion

I created this networking app. What do you think? → https://www.reddit.com/r/web_design/comments/jktgo2/i_created_this_networking_app_what_do_you_think/

in

web_design → https://www.reddit.com/r/web_design/

Comment → https://www.reddit.com/r/NewProductPorn/comments/jftt5j/comment/g9mfs8x/?utm_source=share&utm_medium=web2x&context=3

by

u/MrDurden32 → https://www.reddit.com/user/jeffhowcodes

from discussion

I created this product for virtual networking, hopefully it’s cool enough for you to let my rule breaking slide :) → https://www.reddit.com/r/NewProductPorn/comments/jftt5j/i_created_this_product_for_virtual_networking/

in

web_design → https://www.reddit.com/r/NewProductPorn/

#### Step 2: import feedback from reddit and organize feedback

In order to make it easy to sort through the data, I downloaded all of the comments from the posts in a csv format (a lot of googling) and then imported it into miro as a bunch of post-it notes. I then had a bunch of unsorted feedbacks, so made categories, and skimmed them one by one, and sorted them.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6458b41666eb08eb7eae8fbe_Screen%20Shot%202023-05-08%20at%201.34.17%20AM.png)

For the purposes of planning out which features we needed to create, the product market fit and feature requests categories of feedback were extremely useful.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6458b5539dcb24589583134c_Screen%20Shot%202023-05-08%20at%201.39.42%20AM.png)

#### Step 3: Organize feedback into feature categories

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/6458b78431db95332548b4a0_Screen%20Shot%202023-05-08%20at%201.49.05%20AM.png)

In this section, I created a bunch of potential feature categories and sorted the feedback once again. Throughout the project I added more features I came up with to this list.

#### Step 4: Organize features by market segment

I used the product market fit feedback to make 4 categories of potential target markets this product could add value too, and then I sorted all of the user suggested features, as well as the ones I added, into this venn diagram. This step was extremely important, because it helped us identify which features in the center which added value to all the market segments.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a7d6ce3b26a3e41fe9d4d_Screen%20Shot%202023-05-09%20at%2010.05.41%20AM.png)

We took these features it the center and then re-sorted those in the following steps.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a7fe6fbe64d471a5dc105_Screen%20Shot%202023-05-09%20at%2010.16.18%20AM.png)

#### Step 5: Prioritize features

To prioritize which features to develop first, I did a Bang-For-Your-Buck analysis of each of the features from the center of the venn diagram above.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a8195508f4811bd81089e_Screen%20Shot%202023-05-09%20at%2010.23.29%20AM.png)

As a designer, I knew my estimates of how much effort each feature would take to develop wouldn't be completely accurate, so I then sat down with my lead developer, and we re-evaluated each of them using my draft as a starting point. We also drew arrows to other features to signify development dependencies. This gave us a birds eye view of which features we should tackle first. The top left of the diagram is the features that added the most value for the least amount of cost to develop.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a81b70443d869d0c54e1d_Screen%20Shot%202023-05-09%20at%2010.24.03%20AM.png)

We then re-sorted this view into the tidier cost/benefit analysis diagram.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a81ce1a2ea516b246be53_Screen%20Shot%202023-05-09%20at%2010.24.27%20AM.png)

This gave us a really clear view of our top priorities. We then took these and then added a timeline to these features in the form of a roadmap.

#### Step 6: Add priority features to roadmap

We then sat down again and decided which features should be created when.

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/645a89ad336f931ee3d71a9e_Screen%20Shot%202023-05-09%20at%2010.57.59%20AM.png)

#### Step 7: Create MVP wireframe based on roadmap

Lastly, based on our roadmap, I created this wireframe, and this served as our north star during development.

## Here is the Miro where you can see the steps in greater detail:

[embed: https://miro.com/app/live-embed/o9J_kmMq_Lk=/?moveToViewport=-19078,-13479,57003,38075&embedId=569372329728]

#### Conclusion

This process I created gave my team the ability to give input in every step of the way, and gave my team the confidence that we covered all of our bases for possible directions we could go in, and that we chose the right path.

## Wireframe & Requirements for MVP

Based off of our strategy, I created this wireframe

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/640fcc30d43efd989b7792a1_Kickback%20Wireframe%20Req.png)

## MVP 1

We built this mvp in Unity. This app could pretty much do everything we wanted feature wise, but because it was built in unity, it had one huge drawback, we couldn't make a web app that worked well in a browser. This experience could work well on a desktop app, but when it came to marketing the app, people are not as likely to try out an app if you need to download something, so we figured we would have to change course eventually to create something that could support web app functionality. When it came to our first user test, people really liked the experience. They could all bunch up in one group and have a conversation, or they could split off from the main group and have their own private conversations effortlessly. At 8:23 seconds you can also see the map view in use.

[video: https://www.youtube.com/watch?v=lr7z7HOifoU]

## MVP 2

Our second MVP was built by our second CTO and he built this using DOM rendering. The tech wasn't ideal and ultimately crashed when we did our first real world test. We knew for a fact at that point that dom rendering wasn't fast enough to support a multi user chat application with over 20 users.

[video: https://www.youtube.com/watch?v=rxE1yOiBPeA]

## MVP 3

This was our 3rd mvp build by our second developer, unfortunately, we ran into problems with the voice api that needed to be fixed before we could do a trial run with our first paid customer, and then we ran out of funding. But the multiplayer movement worked really well, and I'm extremely proud of what we built.

[video: https://www.youtube.com/watch?v=tScG5YDaeEA]

## Back to the living room Hackathon - Grand Prize Winner

A bit into the quarantine, I found this hackathon with $10,000 in prizes, and thought the idea I was working on was a perfect fit, so I put together a team, and after several days of sleepless nights and non-stop work, we submitted the following video:

[video: https://www.youtube.com/watch?v=ZISNQThuj_c]

## Conclusion

While this ...

![](https://cdn.prod.website-files.com/626ed9ada82a8575e36ab7e2/640fcc30d43efd989b7792a1_Kickback%20Wireframe%20Req.png)
