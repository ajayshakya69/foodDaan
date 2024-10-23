import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"


export default function ConfirmDialog({ title, message, handlerFunc, setDialogOpen, dialogOpen }) {

  return (
    <>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {message}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handlerFunc}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )

}
