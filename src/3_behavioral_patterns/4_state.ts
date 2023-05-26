class DocumentItem {
  public text: string
  private state: DocumentItemState

  constructor() {
    this.setState(new DraftDocumentItemState())
  }

  getState() {
    return this.state
  }

  setState(state: DocumentItemState) {
    this.state = state
    this.state.setContext(this)
  }

  publishDoc() {
    this.state.publish()
  }

  deleteDoc() {
    this.state.delete()
  }
}

abstract class DocumentItemState {
  public name: string
  public item: DocumentItem

  public setContext(item: DocumentItem) {
    this.item = item
  }

  public abstract publish(): void
  public abstract delete(): void
}

class DraftDocumentItemState extends DocumentItemState {
  constructor() {
    super()
    this.name = 'DraftDocument'
  }

  publish(): void {
    console.log(`${this.item.text} text is sent to site`)
    this.item.setState(new PublishDocumentItemState())
  }

  delete(): void {
    console.log('Document is already deleted')
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor() {
    super()
    this.name = 'PublishDocument'
  }

  publish(): void {
    console.log('Document is already published')
  }

  delete(): void {
    console.log('Removed from publish')
    this.item.setState(new DraftDocumentItemState())
  }
}

const documentItem = new DocumentItem()
documentItem.text = 'My post!'
console.log(documentItem.getState())
documentItem.publishDoc()
console.log(documentItem.getState())
documentItem.publishDoc()
documentItem.deleteDoc()
console.log(documentItem.getState())
documentItem.deleteDoc()
