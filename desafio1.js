class User {
    constructor(name, surname = '', books = [], pets = []) {
        this.name = name
        this.surname = surname
        this.books = books
        this.pets = pets
    }

    getFullName = () => `${this.name} ${this.surname}`

    addPet = petName => this.pets.push(petName)

    countPets = () => this.pets.length

    addBook = (bookTitle, bookAuthor) => this.books.push({ title: bookTitle, author: bookAuthor })

    getBookNames = () => {
        let booksList = [];
        this.books.map(book => booksList.push(book.title))
        return booksList
    }

    // extras
    countBooks = () => this.books.length

    getPets = () => this.pets

    removePet = petName => this.pets = this.pets.filter(pet => pet !== petName)

    removeBook = (key, value) => this.books = this.books.filter(book => book[key] !== value)

    removeBookByTitle = bookTitle => this.removeBook('title', bookTitle)
    removeBookByAuthor = bookAuthor => this.removeBook('author', bookAuthor)
}

const testUser = new User(
    'Adrian',
    'Velazquez',
    [{ 'title': 'The Lord of the Rings', 'author': 'J. R. R. Tolkien' }],
    ['Canela', 'Kero']
)

// main challenge
console.log('\n--- main challenge ---')
console.log(`Full name: ${testUser.getFullName()}`)
console.log(`Count Pets (before): ${testUser.countPets()}`)
console.log('Add pet: Haru');
testUser.addPet('Haru')
console.log(`Count Pets (after): ${testUser.countPets()}`)
console.log('Books names (before):')
console.dir(testUser.getBookNames())
console.log('Add book: The Silmarillion');
testUser.addBook('The Silmarillion', 'Tolkien')
console.log('Books names (after):')
console.dir(testUser.getBookNames())

// extras
console.log('\n--- extras ---')
console.dir(`Count Books: ${testUser.countBooks()}`)
console.log('Pets names:')
console.dir(testUser.getPets())
console.log('Remove pet: Kero')
testUser.removePet('Kero')
console.log('Pets names (after):')
console.dir(testUser.getPets())
console.log('Remove book by author: J. R. R. Tolkien')
testUser.removeBookByAuthor('J. R. R. Tolkien')
console.log('Books names (after):')
console.dir(testUser.getBookNames())
console.log('Remove book by title: The Silmarillion')
testUser.removeBookByTitle('The Silmarillion')
console.log('Books names (after):')
console.dir(testUser.getBookNames())
