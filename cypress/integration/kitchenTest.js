describe('Kitchen Sink-Test', () => {
     context('NavBar and title',function(){
       beforeEach(() => {
         cy.visit('http://localhost:8080/')
       })
       it('Should title be right',function(){
         cy.title().should('include','Kitchen Sink')
       })
       it('Should Commands have dropdown menu',function(){
         cy.get('.dropdown-toggle').contains('Commands')
         cy.get('.dropdown-menu li').contains('Querying')
         cy.get('.dropdown-toggle').next().children().should('have.length',23)
         cy.get('.dropdown').siblings().should('have.length',2)
       })
     })
     context('Querying',function(){
        beforeEach(() => {
          cy.visit('http://localhost:8080/commands/querying')
        })
        it('Should page title be right',function(){
          cy.get('.container').contains('Querying')
        })
        it('cy.get() - query DOM element',function(){
          cy.get('#query-btn').should('contain','Button').click()
        })
        it('cy.contains() - query DOM element with matching content',function(){
          cy.get('.query-list')
            .contains('oranges')
            .should('have.class','second')
          cy.get('.query-button')
            .contains('Save Form')
            .should('have.class','btn')
            .click()
        })
        it('cy.within() - query DOM element within a specific element',function(){
           cy.get('#inputName').type('Nemanja').type('{enter}')
           cy.get('.query-form').within(function() {
                cy.get('#inputEmail')
                  .should('have.attr','placeholder','Email')
                  .type('nemanja@email.com')
                cy.get('#inputPassword')
                  .should('have.attr','placeholder','Password')
                  .type('123456')
           })
        })
        it('cy.root() - query the root DOM element',function(){
           cy.get('.query-ul').within(function(){
           cy.root().should('have.class','query-ul')
           })
           cy.get('.query-ul').children().should('have.length',3)
        })
     })
     context('Traversal',function(){
       beforeEach(()=>{
         cy.visit('http://localhost:8080/commands/traversal')
       })
       it('cy.children - get children of DOM element',function(){
         cy.get('.traversal-breadcrumb').children().should('have.length',3)
         cy.get('.traversal-breadcrumb').children().last().should('have.class','active')
         cy.get('.traversal-breadcrumb').children().eq(1).click()
       })
       it('cy.closest() - get the closest ancestor DOM element',function(){
         cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')
       })
       it('cy.eq() - get a DOM element at a speficic index',function(){
         cy.get('.traversal-list li').eq(2).should('contain','persian')
         cy.get('.traversal-list').children().should('have.length',5)
       })
       it('cy.filter() - get DOM element that match a specific selector',function(){
         cy.get('.traversal-nav li').filter('.active').should('contain','About')
       })
       it('cy.find() - get descendant DOM elements of the selector',function(){
         cy.get('.traversal-pagination').find('li').find('a').should('have.length',7)
       })
       it('cy.first() - get the first DOM element within elements',function(){
         cy.get('.traversal-table thead').find('tr').first().should('contain','#')
         cy.get('.traversal-table tbody').find('tr').first().should('contain','1')
       })
       it('cy.last() - get the last DOM element within elements',function(){
         cy.get('.traversal-buttons').last().should('contain','Submit')
           .click()
       })
       it('cy.nextAll() - get all of the next sibling Dom elements',function(){
         cy.get('.traversal-next-all li').filter('.second').nextAll()
           .should('have.length',3)
       })
       it('cy.nextUntil() - get all of the next sibling DOM element until another element',function(){
         cy.get('#veggies').nextUntil('#nuts').should('have.length',3)
       })
       it('not() - opposite of filter()',function(){
         cy.get('.traversal-disabled').not('[disabled]').should('contain', 'Button')
       })
     })
     context('Actions',function(){
       beforeEach(()=>{
         cy.visit('http://localhost:8080/commands/actions')
       })
       it('type() - type into a DOM element',function(){
         cy.get('#email1').type('nemanja@email.com')
           .should('have.value','nemanja@email.com')
         cy.get('.action-disabled').type('Is not disabled',{force:true})
            .should('have.value','Is not disabled')
       })
       it('focus() - focus on a DOM element',function(){
         cy.get('#password1').focus()
           .should('have.class', 'focus')
           .prev().should('have.attr', 'style', 'color: orange;')
       })
       it('blur() - blur on a DOM element',function(){
         cy.get('#fullName1').type('Hello').blur()
           .should('have.class', 'error')
           .prev().should('have.attr', 'style', 'color: red;')
        })
       it('clear() - clear on a DOM element',function(){
          cy.get('#description').type('Hello world')
            .should('have.value','Hello world')
            .clear()
            .should('have.value','')
       })
       it('submit() - submit a form',function(){
         cy.get('#couponCode1').type('One coupon').should('have.value','One coupon')
         cy.get('.action-form').submit()
           .next().should('contain','Your form has been submitted!')
       })
       it('click() - click a DOM element',function(){
         cy.get('.action-btn').click()
           .next().should('have.class','popover')
         cy.get('#action-canvas').click('right')
         cy.get('.action-labels>.label').click({multiple:true})
         cy.get('.action-opacity>.btn').click({force: true})
       })
       it('dblclick() - double click a DOM element',function(){
         cy.get('.action-div').dblclick().should('not.be.visible')
         cy.get('.action-input-hidden').should('be.visible')
       })
       it('check() - check checkbox or radio',function(){
         cy.get('.action-checkboxes [type="checkbox"]')
           .not('[disabled]').check().should('be.checked')
         cy.get('.action-checkboxes [type="checkbox"]').filter('[disabled]')
           .check({force:true}).should('be.checked')
         cy.get('.action-multiple-checkboxes [type="checkbox"]')
           .not('[disabled]').check(['checkbox1','checkbox2']).should('be.checked')
          cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked')
       })
       it('uncheck() - uncheck checkbox or radio',function(){
         cy.get('.action-check [type="checkbox"]').not('[disabled]')
           .uncheck().should('not.be.checked')
       })
       it('select() - to select an option in a select',function(){
         cy.get('.action-select').select('fr-apples')
       })
       it('scrollIntoView() - scroll an element into view',function(){
         cy.get('#scroll-horizontal button').should('not.be.visible')
         cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')
       })
       it('scrollTo() - scroll the window or a scrollable element to a specific position',function(){
         cy.get('#scrollable-horizontal').scrollTo('right')
         cy.get('#scrollable-vertical').scrollTo(220, 220)
       })
       it('trigger() - trigger an event on a DOM element',function(){
         cy.get('.trigger-input-range').invoke('val',25).trigger('change')
            .get('input[type=range]').siblings('p')
            .should('contain',25)
       })
     })
     context('Viewport',function(){
       beforeEach(() => {
         cy.visit('http://localhost:8080/')
       })
       it('viewport() - set viewport size and dimension',function(){
         cy.get('#navbar').should('be.visible')
         cy.viewport(320, 480)
         cy.get('#navbar').should('not.be.visible')
         cy.get('.navbar-toggle').should('be.visible').click()
         cy.get('.nav').find('a').should('be.visible')
       })
     })
     context('Location',function(){
       beforeEach(() => {
         cy.visit('http://localhost:8080/')
       })
       it('location() - get window.location',function(){
         cy.location().should(function(location){
           expect(location.href).to.eq('http://localhost:8080/')
           expect(location.hostname).to.eq('localhost')
           expect(location.port).to.eq('8080')
         })
       })
       it('url() - get current url',function(){
         cy.url().should('eq','http://localhost:8080/')
       })
     })
     context('Navigation',function(){
         beforeEach(() => {
          cy.visit('http://localhost:8080/commands/navigation')
        })
         it('go() - to go back or forward in the browser\'s history',function(){
           cy.location('pathname').should('include','navigation')
           cy.go('back')
           cy.location('pathname').should('not.include','navigation')
           cy.go('forward')
           cy.location('pathname').should('include','navigation')
         })
     })
     context
     ('Assertions',function(){
       beforeEach(() => {
        cy.visit('http://localhost:8080/commands/assertions')
      })
        it('should() - make an assertion about the current subject',function(){
          cy.get('.assertion-table')
            .find('thead th:last').should('contain','Column heading')
        })
       it('and() - chain a multiple assertions together',function(){
         cy.get('.assertions-link').should('contain','Cypress Docs')
           .and('attr','href')
           .and('include','cypress.io')
       })
       it('expect() - make an assertion about specified subject',function(){
         cy.get('.assertions-p').find('p')
           .should(function($p){
         var texts = $p.map(function(i, el){
            return Cypress.$(el).text()
         })
         var texts = texts.get()
         expect(texts).to.have.length(3)
         expect(texts).to.deep.eq([
          'Some text from first p',
          'More text from second p',
          'And even more text from third p'
        ])
       })
       })
      })
    context('Miscellaneous',function(){
      beforeEach(() => {
       cy.visit('http://localhost:8080/commands/misc')
     })
      it('end() - end the command chain',function(){
         cy.get('.misc-table').within(function(){
           cy.contains('Cheryl').click().end()
           cy.contains('Charles').click()
         })
      })
      it('exec() - execute a system command',function(){
        cy.exec('echo Hello world')
        .its('stdout').should('contain','Hello world')
      })
      it('focused() - get the DOM element that has focus',function(){
        cy.get('#name').click().focused().should('have.class','form-control')
        cy.get('#description').click().focused().should('have.class','form-control')
      })
      it('wrap() - wrap an object',function(){
        cy.wrap({name:'Nemanja'})
          .should('have.property','name')
          .and('contain','Nemanja')
      })
    })
    context('Connectors',function(){
        beforeEach(() => {
         cy.visit('http://localhost:8080/commands/connectors')
       })
        it('each() - iterate over the elements of a current subject',function(){
          cy.get('.connectors-each-ul>li')
            .each(function($el,index,$list){
              console.log($el,index,$list)
            })
        })
        it('its() - get the properties on the current subject',function(){
          cy.get('.connectors-its-ul>li').its('length').should('be.eq',3)
        })
        it('invoke() - invoke a function on the current subject',function(){
          cy.get('.connectors-div').should('not.be.visible')
            .invoke('show')
            .should('be.visible')
        })
        it('spread() - spread an array as individual arguments to a callback function',function(){
          var arr = ['one','two','three']
          cy.wrap(arr).spread(function(one,two,three){
            expect(one).to.eq('one')
            expect(two).to.eq('two')
            expect(three).to.eq('three')
          })
        })
         it('then() - invoke a callback function with the current subject',function(){
           cy.get('.connectors-list>li').then(($lis)=>{
             expect($lis).to.have.length(3)
             expect($lis.eq(0)).to.contain('Walk the dog')
             expect($lis.eq(1)).to.contain('Feed the cat')
             expect($lis.eq(2)).to.contain('Write JavaScript')
           })
         })
    })
    context('Aliasing',function(){
      beforeEach(() => {
       cy.visit('http://localhost:8080/commands/aliasing')
     })
      it('as() - alias a route or DOM element for use later',function(){
        cy.get('.as-table').find('tbody>tr')
          .first().find('td').first().find('button').as('firstBtn')
        cy.get('@firstBtn').click()
        cy.get('@firstBtn')
          .should('have.class', 'btn-success')
          .and('contain', 'Changed')
      })
    })
    context('Network Requests',function(){
      beforeEach(() => {
       cy.visit('http://localhost:8080/commands/network-requests')
     })
      it('server() - control the behavior of network requests and responses',function(){
        cy.server().should(function(server){
          expect(server.method).to.eq('GET')
          expect(server.status).to.eq(200)
          expect(server.response).to.be.null
        })
      })
      it('request() - make an XHR request',function(){
        cy.request('https://jsonplaceholder.typicode.com/comments').should(function(response){
           expect(response.status).to.eq(200)
           expect(response.body).to.have.length(500)
           expect(response).to.have.property('headers')
           expect(response).to.have.property('duration')
       })
      })
      it('route() - route response to matching requests',function(){
         var msg = 'this message doesn\'t exist'
         cy.server()
         cy.route(/comments\/1/).as('getComment')
         cy.get('.network-btn').click()
         cy.wait('@getComment').its('status').should('eq',200)
         cy.route('POST','/comments').as('postComment')
         cy.get('.network-post').click()
         cy.wait('@postComment')
         cy.get('.network-post').next().should('have.class','network-post-comment')
           .and('contain','POST successful!')
         cy.get('@postComment').then(function(xhr){
            expect(xhr.requestBody).to.include('email')
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.responseBody).to.have.property('name','Using POST in cy.route()')
            expect(xhr.responseBody).to.have.property('email','hello@cypress.io')
         })

      })
    })
    context.only('Files',function(){
        beforeEach(() => {
         cy.visit('http://localhost:8080/commands/files')
     })
        it('fixtures() - load a fixture',function(){
          cy.server()
          cy.fixture('example.json').as('comment')
          cy.route(/comments/,'@comment').as('getComment')
          cy.get('.fixture-btn').click()
          cy.wait('@getComment').its('responseBody')
            .should('have.property','name')
            .and('contain','Using fixtures to represent data')
        })
        it('files() - read a file\'s content',function(){
          cy.readFile('cypress.json').then(function(json){
            expect(json).to.be.an('object')
          })
        })
    })
})
